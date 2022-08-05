package fr.osallek.osasaveviewer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.osallek.osasaveviewer.config.ApplicationProperties;
import fr.osallek.osasaveviewer.service.object.UserInfo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;

@Service
public class UserService {

    private final ObjectMapper objectMapper;

    private final ApplicationProperties properties;

    private final SteamService steamService;

    public UserService(ObjectMapper objectMapper, ApplicationProperties properties, SteamService steamService) {
        this.objectMapper = objectMapper;
        this.properties = properties;
        this.steamService = steamService;
    }

    public UserInfo getOrCreateUserInfo(String userId) throws IOException {
        Optional<UserInfo> userInfo = getUserInfo(userId);

        if (userInfo.isPresent()) {
            return userInfo.get();
        }

        UserInfo info = new UserInfo(userId);
        return saveUserInfo(info);
    }

    public Optional<UserInfo> getUserInfo(String userId) throws IOException {
        Path path = this.properties.getUsersFolder().resolve(userId + ".json");

        if (Files.exists(path)) {
            return Optional.of(this.objectMapper.readValue(path.toFile(), UserInfo.class));
        }

        return Optional.empty();
    }

    public UserInfo saveUserInfo(UserInfo userInfo) throws IOException {
        this.steamService.getSteamInfos(userInfo.getId()).ifPresent(userInfo::update);
        this.objectMapper.writeValue(this.properties.getUsersFolder().resolve(userInfo.getId() + ".json").toFile(), userInfo);

        return userInfo;
    }
}
