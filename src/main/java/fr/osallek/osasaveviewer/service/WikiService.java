package fr.osallek.osasaveviewer.service;

import fr.osallek.osasaveviewer.config.ApplicationProperties;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;
import java.util.stream.Stream;

@Service
public class WikiService {

    private final SortedSet<String> versions;

    public WikiService(ApplicationProperties properties) throws IOException {
        this.versions = new TreeSet<>(Comparator.reverseOrder());
        try (Stream<Path> stream = Files.list(properties.getWikiFolder())) {
            stream.forEach(path -> {
                if (!path.equals(properties.getWikiImagesFolder())) {
                    this.versions.add(path.getFileName().toString());
                }
            });
        }
    }

    public SortedSet<String> getVersions() {
        return versions;
    }
}
