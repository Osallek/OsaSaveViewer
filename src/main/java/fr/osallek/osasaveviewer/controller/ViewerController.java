package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.config.ApplicationProperties;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ViewerController {

    private final ResponseEntity<FileSystemResource> extractorResponse;

    private final ResponseEntity<String> versionResponse;

    public ViewerController(ApplicationProperties properties) {
        HttpHeaders extractorHeaders = new HttpHeaders();
        extractorHeaders.set(HttpHeaders.CONTENT_TYPE, "application/java-archive");
        extractorHeaders.set(HttpHeaders.CONTENT_DISPOSITION,
                             ContentDisposition.builder("attachment").filename("OsaSaveExtractorUpdater.jar").build().toString());
        FileSystemResource resource = new FileSystemResource(properties.getExtractorPath());

        this.extractorResponse = new ResponseEntity<>(resource, extractorHeaders, HttpStatus.OK);

        HttpHeaders versionHeaders = new HttpHeaders();
        versionHeaders.setContentType(MediaType.TEXT_PLAIN);

        this.versionResponse = new ResponseEntity<>(properties.getMinExtractorVersion(), versionHeaders, HttpStatus.OK);
    }

    @GetMapping("/download-extractor")
    public ResponseEntity<FileSystemResource> getFile() {
        return this.extractorResponse;
    }

    @GetMapping("/api/version")
    public ResponseEntity<String> getMinVersion() {
        return this.versionResponse;
    }
}
