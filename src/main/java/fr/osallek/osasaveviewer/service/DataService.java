package fr.osallek.osasaveviewer.service;

import fr.osallek.osasaveviewer.common.Constants;
import fr.osallek.osasaveviewer.common.ZipUtils;
import fr.osallek.osasaveviewer.common.exception.UnauthorizedException;
import fr.osallek.osasaveviewer.config.ApplicationProperties;
import fr.osallek.osasaveviewer.controller.dto.AssetsDTO;
import fr.osallek.osasaveviewer.controller.dto.DataAssetDTO;
import fr.osallek.osasaveviewer.controller.dto.save.CountryDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ExtractorSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.save.IdeaGroupDTO;
import fr.osallek.osasaveviewer.controller.dto.save.NamedImageLocalisedDTO;
import fr.osallek.osasaveviewer.service.object.UserInfo;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class DataService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataService.class);

    public static final List<String> FOLDERS = List.of("advisors", "buildings", "colors", "estates", "flags", "goods", "idea_groups", "institutions",
                                                       "modifiers", "privileges", "provinces", "religions");

    private final UserService userService;

    private final ApplicationProperties properties;

    public DataService(UserService userService, ApplicationProperties properties) {
        this.userService = userService;
        this.properties = properties;
    }

    public void receive(MultipartFile file, DataAssetDTO data) throws IOException {
        if (!"assets.zip".equals(file.getOriginalFilename())) {
            throw new UnauthorizedException();
        }

        if (StringUtils.isBlank(data.userId()) || StringUtils.isBlank(data.saveId())) {
            throw new UnauthorizedException();
        }

        Optional<UserInfo> userInfo = this.userService.getUserInfo(data.userId());

        if (userInfo.isEmpty() || userInfo.get().getSaves().stream().noneMatch(save -> save.id().equals(data.saveId()))) {
            throw new UnauthorizedException();
        }

        Path tmpFolder = Path.of(FileUtils.getTempDirectoryPath(), UUID.randomUUID().toString());
        Path tmpPath = tmpFolder.resolve(file.getOriginalFilename());
        try {
            FileUtils.forceMkdirParent(tmpPath.toFile());
            file.transferTo(tmpPath);
            ZipUtils.unzip(tmpPath, tmpFolder);

            List<Path> valid = new ArrayList<>();
            try (Stream<Path> stream = Files.walk(tmpFolder)) {
                stream.forEach(path -> {
                    try {
                        if (path.equals(tmpFolder)) {
                            return;
                        }

                        if (path.toFile().isDirectory()) {
                            if (FOLDERS.contains(path.getFileName().toString())) {
                                valid.add(path);
                            } else {
                                FileUtils.deleteQuietly(path.toFile());
                            }
                            return;
                        }

                        if (Constants.checkPngImage(path)) {
                            valid.add(path);
                        }
                    } catch (IOException e) {
                        LOGGER.error(e.getMessage(), e);
                    }
                });
            }

            FileUtils.copyDirectory(tmpFolder.toFile(), this.properties.getDataFolder().toFile(), pathname -> valid.contains(pathname.toPath()), true);
        } finally {
            FileUtils.deleteQuietly(tmpFolder.toFile());
        }
    }

    public AssetsDTO dataExists(ExtractorSaveDTO save) {
        AssetsDTO assets = new AssetsDTO();

        if (!Files.exists(this.properties.getDataFolder().resolve("provinces").resolve(save.getProvinceImage() + ".png"))) {
            assets.setProvinces(true);
        }

        if (!Files.exists(this.properties.getDataFolder().resolve("colors").resolve(save.getColorsImage() + ".png"))) {
            assets.setColors(true);
        }

        assets.setCountries(save.getCountries()
                                .stream()
                                .filter(country -> !Files.exists(this.properties.getDataFolder().resolve("flags").resolve(country.getImage() + ".png")))
                                .map(CountryDTO::getTag)
                                .collect(Collectors.toSet()));

        assets.setAdvisors(save.getAdvisorTypes()
                               .stream()
                               .filter(advisor -> !Files.exists(this.properties.getDataFolder().resolve("advisors").resolve(advisor.getImage() + ".png")))
                               .map(NamedImageLocalisedDTO::getName)
                               .collect(Collectors.toSet()));

        assets.setInstitutions(save.getInstitutions()
                                   .stream()
                                   .filter(institution -> !Files.exists(this.properties.getDataFolder()
                                                                                       .resolve("institutions")
                                                                                       .resolve(institution.getImage() + ".png")))
                                   .map(NamedImageLocalisedDTO::getName)
                                   .collect(Collectors.toSet()));

        assets.setBuildings(save.getBuildings()
                                .stream()
                                .filter(building -> !Files.exists(this.properties.getDataFolder().resolve("buildings").resolve(building.getImage() + ".png")))
                                .map(NamedImageLocalisedDTO::getName)
                                .collect(Collectors.toSet()));

        assets.setReligions(save.getReligions()
                                .stream()
                                .filter(religion -> !Files.exists(this.properties.getDataFolder().resolve("religions").resolve(religion.getImage() + ".png")))
                                .map(NamedImageLocalisedDTO::getName)
                                .collect(Collectors.toSet()));

        assets.setTradeGoods(save.getTradeGoods()
                                 .stream()
                                 .filter(good -> !Files.exists(this.properties.getDataFolder().resolve("goods").resolve(good.getImage() + ".png")))
                                 .map(NamedImageLocalisedDTO::getName)
                                 .collect(Collectors.toSet()));

        assets.setEstates(save.getEstates()
                              .stream()
                              .filter(estate -> !Files.exists(this.properties.getDataFolder().resolve("estates").resolve(estate.getImage() + ".png")))
                              .map(NamedImageLocalisedDTO::getName)
                              .collect(Collectors.toSet()));

        assets.setPrivileges(save.getEstatePrivileges()
                                 .stream()
                                 .filter(privilege -> privilege.getImage() != null)
                                 .filter(privilege -> !Files.exists(this.properties.getDataFolder()
                                                                                   .resolve("privileges")
                                                                                   .resolve(privilege.getImage() + ".png")))
                                 .map(NamedImageLocalisedDTO::getName)
                                 .collect(Collectors.toSet()));

        assets.setIdeaGroups(save.getIdeaGroups()
                                 .stream()
                                 .filter(group -> group.getImage() != null)
                                 .filter(group -> !Files.exists(this.properties.getDataFolder().resolve("idea_groups").resolve(group.getImage() + ".png")))
                                 .map(NamedImageLocalisedDTO::getName)
                                 .collect(Collectors.toSet()));

        assets.setIdeas(save.getIdeaGroups()
                            .stream()
                            .map(IdeaGroupDTO::getIdeas)
                            .flatMap(Collection::stream)
                            .filter(idea -> idea.getImage() != null)
                            .filter(idea -> !Files.exists(this.properties.getDataFolder().resolve("modifiers").resolve(idea.getImage() + ".png")))
                            .map(NamedImageLocalisedDTO::getName)
                            .collect(Collectors.toSet()));

        assets.setPersonalities(save.getPersonalities()
                                    .stream()
                                    .filter(personality -> personality.getImage() != null)
                                    .filter(p -> !Files.exists(this.properties.getDataFolder().resolve("modifiers").resolve(p.getImage() + ".png")))
                                    .map(NamedImageLocalisedDTO::getName)
                                    .collect(Collectors.toSet()));

        assets.setLeaderPersonalities(save.getLeaderPersonalities()
                                          .stream()
                                          .filter(personality -> personality.getImage() != null)
                                          .filter(p -> !Files.exists(this.properties.getDataFolder()
                                                                                    .resolve("modifiers")
                                                                                    .resolve(p.getImage() + ".png")))
                                          .map(NamedImageLocalisedDTO::getName)
                                          .collect(Collectors.toSet()));

        return assets;
    }
}
