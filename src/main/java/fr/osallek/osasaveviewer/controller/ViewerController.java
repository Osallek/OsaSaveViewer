package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.config.ApplicationProperties;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/download-extractor")
public class ViewerController {

    private final ApplicationProperties properties;

    public ViewerController(ApplicationProperties properties) {
        this.properties = properties;
    }

    @GetMapping
    public ResponseEntity<FileSystemResource> getFile() {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.CONTENT_TYPE, "application/java-archive");
        headers.set(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.builder("attachment").filename("OsaSaveExtractorUpdater.jar").build().toString());
        FileSystemResource resource = new FileSystemResource(this.properties.getExtractorPath());

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}
