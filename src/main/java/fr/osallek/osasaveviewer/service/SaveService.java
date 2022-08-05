package fr.osallek.osasaveviewer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.osallek.osasaveviewer.common.exception.PreviousSaveAfterException;
import fr.osallek.osasaveviewer.common.exception.PreviousSaveDoesNotExistException;
import fr.osallek.osasaveviewer.common.exception.UnauthorizedException;
import fr.osallek.osasaveviewer.config.ApplicationProperties;
import fr.osallek.osasaveviewer.controller.dto.ServerSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.UploadResponseDTO;
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

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class SaveService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SaveService.class);

    private static final int MAX_QUEUE_SIZE = 20;

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

        FileUtils.forceMkdir(this.properties.getSavesFolder().toFile());
        FileUtils.forceMkdir(this.properties.getUsersFolder().toFile());

        SortedSet<ServerSaveDTO> serverSaves = new TreeSet<>(Comparator.comparing(ServerSaveDTO::creationDate).reversed());
        try (Stream<Path> stream = Files.walk(this.properties.getUsersFolder())) {
            stream.forEach(path -> {
                try {
                    this.userService.getUserInfo(FilenameUtils.removeExtension(path.getFileName().toString())).ifPresent(userInfo -> {
                        serverSaves.addAll(userInfo.getSaves());

                        if (serverSaves.size() > MAX_QUEUE_SIZE) {
                            serverSaves.retainAll(serverSaves.headSet(IterableUtils.get(serverSaves, MAX_QUEUE_SIZE)));
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
        return this.properties.getSavesFolder().resolve(id + ".json");
    }

    public boolean saveExists(String id) {
        return Files.exists(getSave(id));
    }

    public UploadResponseDTO upload(ExtractorSaveDTO save) throws IOException {
        if (StringUtils.isNotBlank(save.getPreviousSave()) && !saveExists(save.getPreviousSave())) {
            throw new PreviousSaveDoesNotExistException(save.getPreviousSave());
        }

        String id = getId(this.properties.getSavesFolder());

        if (StringUtils.isNotBlank(save.getPreviousSave())) {
            ExtractorSaveDTO previousSave = this.objectMapper.readValue(getSave(save.getPreviousSave()).toFile(), ExtractorSaveDTO.class);

            if (save.getDate().isBefore(previousSave.getDate()) || save.getDate().equals(previousSave.getDate())) {
                throw new PreviousSaveAfterException(save.getPreviousSave());
            }

            processPreviousSave(save, previousSave);
        }

        Path dest = this.properties.getSavesFolder().resolve(id + ".json");
        this.objectMapper.writeValue(dest.toFile(), save);

        UserInfo userInfo = this.userService.getOrCreateUserInfo(save.getOwner());
        ServerSaveDTO serverSave = userInfo.addSave(save, id);
        this.userService.saveUserInfo(userInfo);

        UploadResponseDTO response = checkAssets(save, id);
        this.lastSaves.add(serverSave);

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
                Path dest = this.properties.getSavesFolder().resolve(id + ".json");

                if (Files.exists(dest)) {
                    FileUtils.deleteQuietly(dest.toFile());
                }

                userInfo.getSaves().removeIf(s -> id.equals(s.id()));
                this.lastSaves.removeIf(s -> id.equals(s.id()));
            } else {
                throw new UnauthorizedException();
            }
        }

        return this.userService.saveUserInfo(userInfo);
    }

    private String getId(Path path) {
        String id;

        do {
            id = UUID.randomUUID().toString();
        } while (Files.exists(path.resolve(id + ".json")));

        return id;
    }

    private UploadResponseDTO checkAssets(ExtractorSaveDTO save, String id) {
        return new UploadResponseDTO(id, this.properties.getFrontUrl() + "/viewer/save/" + id, this.dataService.dataExists(save));
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
}
