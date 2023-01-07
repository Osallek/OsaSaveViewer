package fr.osallek.osasaveviewer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.osallek.osasaveviewer.common.Constants;
import fr.osallek.osasaveviewer.common.CustomGZIPOutputStream;
import fr.osallek.osasaveviewer.common.exception.PreviousSaveAfterException;
import fr.osallek.osasaveviewer.common.exception.PreviousSaveDoesNotExistException;
import fr.osallek.osasaveviewer.common.exception.UnauthorizedException;
import fr.osallek.osasaveviewer.config.ApplicationProperties;
import fr.osallek.osasaveviewer.controller.dto.ServerSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.UploadResponseDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ColorsDTO;
import fr.osallek.osasaveviewer.controller.dto.save.CountryDTO;
import fr.osallek.osasaveviewer.controller.dto.save.CountryPreviousSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ExtractorSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.save.PreviousSaveDTO;
import fr.osallek.osasaveviewer.service.object.UserInfo;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.IterableUtils;
import org.apache.commons.collections4.queue.CircularFifoQueue;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.UUID;
import java.util.function.Predicate;
import java.util.stream.Stream;
import java.util.zip.GZIPInputStream;

@Service
public class SaveService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SaveService.class);

    private static final int MAX_QUEUE_SIZE = 20;

    private static final int OCEAN_COLOR = new Color(68, 107, 163, 255).getRGB();

    private static final int EMPTY_COLOR = new Color(148, 148, 149, 255).getRGB();

    private static final int IMPASSABLE_COLOR = new Color(94, 94, 94, 255).getRGB();

    private static final Color IMPASSABLE_PROV_COLOR = new Color(200, 255, 255);

    private static final Color OCEAN_PROV_COLOR = new Color(227, 255, 255);

    private final CircularFifoQueue<ServerSaveDTO> lastSaves = new CircularFifoQueue<>(MAX_QUEUE_SIZE);

    private final ObjectMapper objectMapper;

    private final ApplicationProperties properties;

    private final DataService dataService;

    private final UserService userService;

    public SaveService(ObjectMapper objectMapper, ApplicationProperties properties, @Lazy DataService dataService, UserService userService) throws IOException {
        this.objectMapper = objectMapper;
        this.properties = properties;
        this.dataService = dataService;
        this.userService = userService;

        FileUtils.forceMkdir(this.properties.getDataSavesFolder().toFile());
        FileUtils.forceMkdir(this.properties.getUsersFolder().toFile());

        SortedSet<ServerSaveDTO> serverSaves = new TreeSet<>(Comparator.comparing(ServerSaveDTO::creationDate));
        try (Stream<Path> stream = Files.walk(this.properties.getUsersFolder())) {
            stream.forEach(path -> {
                try {
                    this.userService.getUserInfo(FilenameUtils.removeExtension(path.getFileName().toString())).ifPresent(userInfo -> {
                        if (CollectionUtils.isNotEmpty(userInfo.getSaves())) {
                            serverSaves.addAll(userInfo.getSaves().stream().filter(Predicate.not(ServerSaveDTO::hideAll)).toList());

                            if (serverSaves.size() > MAX_QUEUE_SIZE) {
                                serverSaves.retainAll(serverSaves.tailSet(IterableUtils.get(serverSaves, Math.max(0, serverSaves.size() - MAX_QUEUE_SIZE))));
                            }
                        }
                    });
                } catch (IOException e) {
                    LOGGER.error(e.getMessage(), e);
                }
            });
        }

        this.lastSaves.addAll(serverSaves);
    }

    public SortedSet<ServerSaveDTO> getLastSaves() {
        return new TreeSet<>(this.lastSaves);
    }

    public SortedSet<ServerSaveDTO> getSaveForUser(String userId) throws IOException {
        return this.userService.getUserInfo(userId).map(UserInfo::getSaves).orElse(new TreeSet<>());
    }

    public Path getSave(String id) {
        return this.properties.getDataSavesFolder().resolve(id + ".json.gz");
    }

    public Path getSaveImage(String id) {
        return this.properties.getDataSavesFolder().resolve(id + ".png");
    }

    public boolean saveExists(String id) {
        return Files.exists(getSave(id));
    }

    public ExtractorSaveDTO readSave(String id) throws IOException {
        if (!saveExists(id)) {
            return null;
        }

        try (GZIPInputStream inputStream = new GZIPInputStream(new FileInputStream(getSave(id).toFile()))) {
            return this.objectMapper.readValue(inputStream, ExtractorSaveDTO.class);
        }
    }

    public UploadResponseDTO upload(ExtractorSaveDTO save) throws IOException {
        if (StringUtils.isNotBlank(save.getPreviousSave()) && !saveExists(save.getPreviousSave())) {
            throw new PreviousSaveDoesNotExistException(save.getPreviousSave());
        }

        String id = getId();

        if (StringUtils.isNotBlank(save.getPreviousSave())) {
            ExtractorSaveDTO previousSave = readSave(save.getPreviousSave());

            if (save.getDate().isBefore(previousSave.getDate()) || save.getDate().equals(previousSave.getDate())) {
                throw new PreviousSaveAfterException(save.getPreviousSave());
            }

            processPreviousSave(save, previousSave);
        }

        Path dest = getSave(id);
        try (CustomGZIPOutputStream outputStream = new CustomGZIPOutputStream(new FileOutputStream(dest.toFile()))) {
            this.objectMapper.writeValue(outputStream, save);
        }

        UserInfo userInfo = this.userService.getOrCreateUserInfo(save.getOwner());
        ServerSaveDTO serverSave = userInfo.addSave(save, id);
        this.userService.saveUserInfo(userInfo);

        UploadResponseDTO response = checkAssets(save, id);

        if (!serverSave.hideAll()) {
            this.lastSaves.add(serverSave);
        }

        return response;
    }

    public UserInfo delete(String id, Optional<String> userId) throws IOException {
        if (userId.isEmpty()) {
            throw new UnauthorizedException();
        }

        UserInfo userInfo = this.userService.getOrCreateUserInfo(userId.get());

        if (CollectionUtils.isNotEmpty(userInfo.getSaves())) {
            Optional<ServerSaveDTO> save = userInfo.getSaves().stream().filter(serverSave -> id.equals(serverSave.id())).findFirst();

            if (save.isPresent()) {

                userInfo.getSaves().removeIf(s -> id.equals(s.id()));
                this.lastSaves.removeIf(s -> id.equals(s.id()));

                if (saveExists(id)) {
                    FileUtils.deleteQuietly(getSave(id).toFile());
                    FileUtils.deleteQuietly(getSaveImage(id).toFile());
                }
            }
        }

        return this.userService.saveUserInfo(userInfo);
    }

    private String getId() {
        String id;

        do {
            id = UUID.randomUUID().toString();
        } while (saveExists(id));

        return id;
    }

    private UploadResponseDTO checkAssets(ExtractorSaveDTO save, String id) {
        return new UploadResponseDTO(id, this.properties.getFrontUrl() + "/save/" + id, this.dataService.dataExists(save));
    }

    private void processPreviousSave(ExtractorSaveDTO newSave, ExtractorSaveDTO previousSave) {
        SortedSet<PreviousSaveDTO> previousSaves = previousSave.getPreviousSaves();

        if (CollectionUtils.isEmpty(previousSaves)) {
            previousSaves = new TreeSet<>();
        }

        previousSaves.add(new PreviousSaveDTO(previousSave, newSave.getPreviousSave()));

        newSave.setPreviousSaves(previousSaves);

        for (CountryDTO country : newSave.getCountries()) {
            previousSave.getCountries().stream().filter(c -> c.getTag().equals(country.getTagAtDate(previousSave.getDate()))).findFirst().ifPresent(c -> {
                SortedSet<CountryPreviousSaveDTO> previous = c.getPreviousSaves();

                if (CollectionUtils.isEmpty(previous)) {
                    previous = new TreeSet<>();
                }

                previous.add(new CountryPreviousSaveDTO(previousSave, c));

                country.setPreviousSaves(previous);
            });
        }
    }

    public void processImage(String id) throws IOException {
        if (!saveExists(id)) {
            return;
        }

        ExtractorSaveDTO save = readSave(id);
        Map<Color, Integer> colorsMap = new HashMap<>();


        colorsMap.put(OCEAN_PROV_COLOR, OCEAN_COLOR);
        colorsMap.put(IMPASSABLE_PROV_COLOR, IMPASSABLE_COLOR);
        save.getProvinces().forEach(province -> {
            String owner = province.getCurrentOwner();

            if (owner == null) {
                colorsMap.put(new Color(province.getId()), EMPTY_COLOR);
            } else {
                colorsMap.put(new Color(province.getId()), save.getCountries()
                                                               .stream()
                                                               .filter(c -> owner.equals(c.getTag()))
                                                               .findFirst()
                                                               .map(CountryDTO::getColors)
                                                               .map(ColorsDTO::mapColor)
                                                               .map(color -> new Color(color.red(), color.green(), color.blue(),
                                                                                       color.alpha()).getRGB())
                                                               .orElse(EMPTY_COLOR));
            }
        });

        BufferedImage provincesImage = ImageIO.read(this.properties.getDataProvincesFolder().resolve(save.getProvinceImage() + ".png").toFile());
        BufferedImage image = new BufferedImage(provincesImage.getWidth(), provincesImage.getHeight(), BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < provincesImage.getHeight(); y++) {
            for (int x = 0; x < provincesImage.getWidth(); x++) {
                image.setRGB(x, y, colorsMap.getOrDefault(new Color(provincesImage.getRGB(x, y)), Color.BLACK.getRGB()));
            }
        }

        Path dest = getSaveImage(id);
        ImageIO.write(image, "png", dest.toFile());
        Constants.optimizePng(dest, dest);
    }
}
