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

import javax.servlet.http.HttpServletResponse;
import java.net.URI;

@RestController
@RequestMapping
public class ViewerController {

    private final ResponseEntity<Void> root;

    private final ApplicationProperties properties;

    public ViewerController(ApplicationProperties properties) {
        this.properties = properties;

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/viewer"));
        this.root = new ResponseEntity<>(null, headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping
    public ResponseEntity<Void> root() {
        return this.root;
    }

    @GetMapping("/download-extractor")
    public FileSystemResource getFile(HttpServletResponse response) {
        response.setContentType("application/java-archive");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                           ContentDisposition.builder("attachment").filename("OsaSaveExtractorUpdater.jar").build().toString());
        return new FileSystemResource(this.properties.getExtractorPath());
    }
}
