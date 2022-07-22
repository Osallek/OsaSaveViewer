package fr.osallek.osasaveviewer.config;

import java.nio.file.Path;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "application")
public class ApplicationProperties {

    private String frontUrl;

    private Path baseFolder;

    public String getFrontUrl() {
        return frontUrl;
    }

    public void setFrontUrl(String frontUrl) {
        this.frontUrl = frontUrl;
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
        return getDataFolder().resolve("saves");
    }
}
