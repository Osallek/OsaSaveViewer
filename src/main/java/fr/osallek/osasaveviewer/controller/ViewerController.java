package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.config.ApplicationProperties;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping
public class ViewerController {

    private final ApplicationProperties properties;

    public ViewerController(ApplicationProperties properties) {
        this.properties = properties;
    }

    @GetMapping("/download-extractor")
    public FileSystemResource getFile(HttpServletResponse response) {
        response.setContentType("application/java-archive");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                           ContentDisposition.builder("attachment").filename("OsaSaveExtractorUpdater.jar").build().toString());
        return new FileSystemResource(this.properties.getExtractorPath());
    }
}
