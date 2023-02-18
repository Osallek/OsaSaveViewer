package fr.osallek.osasaveviewer.service;

import fr.osallek.osasaveviewer.config.ApplicationProperties;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class WikiService {

    private final SortedMap<String, String> versions;

    public WikiService(ApplicationProperties properties) throws IOException {
        this.versions = new TreeMap<>(Comparator.reverseOrder());
        try (Stream<Path> foldersStream = Files.list(properties.getWikiFolder())) {
            foldersStream.forEach(folder -> {
                if (!folder.equals(properties.getWikiImagesFolder())) {
                    try (Stream<Path> filesStream = Files.list(folder)) {
                        filesStream.sorted(Comparator.comparing(path -> path.toFile().lastModified(), Comparator.reverseOrder()))
                                   .filter(file -> {
                                       try {
                                           if (file.getFileName().toString().endsWith(".json")) {
                                               UUID.fromString(FilenameUtils.removeExtension(file.getFileName().toString()));
                                               return true;
                                           } else if (file.getFileName().toString().endsWith(".gz") || file.getFileName().toString().endsWith(".br")) {
                                               UUID.fromString(FilenameUtils.removeExtension(FilenameUtils.removeExtension(file.getFileName().toString())));
                                               return true;
                                           }

                                           return false;
                                       } catch (Exception ignored) {
                                           return false;
                                       }
                                   })
                                   .findFirst()
                                   .ifPresent(path -> {
                                       if (path.getFileName().toString().endsWith(".json")) {
                                           this.versions.put(folder.getFileName().toString(), path.getFileName().toString());
                                       } else if (path.getFileName().toString().endsWith(".gz") || path.getFileName().toString().endsWith(".br")) {
                                           this.versions.put(folder.getFileName().toString(), FilenameUtils.removeExtension(path.getFileName().toString()));
                                       }
                                   });
                    } catch (Exception ignored) {
                    }
                }
            });
        }
    }

    public SortedMap<String, String> getVersions() {
        return versions;
    }
}
