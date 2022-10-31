package fr.osallek.osasaveviewer.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.net.URI;
import java.nio.file.Path;

@Configuration
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

    private URI frontUrl;

    private Path baseFolder;

    private String steamApiKey;

    private String minExtractorVersion;

    public URI getFrontUrl() {
        return frontUrl;
    }

    public void setFrontUrl(String frontUrl) {
        this.frontUrl = URI.create(frontUrl);
    }

    public Path getBaseFolder() {
        return baseFolder;
    }

    public void setBaseFolder(Path baseFolder) {
        this.baseFolder = baseFolder.toAbsolutePath();
    }

    public Path getDataFolder() {
        return this.baseFolder.resolve("data");
    }

    public Path getUsersFolder() {
        return this.baseFolder.resolve("users");
    }
    
    public Path getSavesFolder() {
        return this.baseFolder.resolve("saves");
    }

    public Path getDataSavesFolder() {
        return getDataFolder().resolve("saves");
    }

    public Path getDataProvincesFolder() {
        return getDataFolder().resolve("provinces");
    }

    public Path getExtractorPath() {
        return this.baseFolder.resolve("OsaSaveExtractorUpdater.jar");
    }

    public String getSteamApiKey() {
        return steamApiKey;
    }

    public void setSteamApiKey(String steamApiKey) {
        this.steamApiKey = steamApiKey;
    }

    public String getMinExtractorVersion() {
        return minExtractorVersion;
    }

    public void setMinExtractorVersion(String minExtractorVersion) {
        this.minExtractorVersion = minExtractorVersion;
    }
}
