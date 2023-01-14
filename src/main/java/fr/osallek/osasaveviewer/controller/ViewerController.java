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

    private final ResponseEntity<FileSystemResource> editorResponse;

    private final ResponseEntity<String> versionResponse;

    public ViewerController(ApplicationProperties properties) {
        HttpHeaders extractorHeaders = new HttpHeaders();
        extractorHeaders.set(HttpHeaders.CONTENT_TYPE, "application/vnd.microsoft.portable-executable");
        extractorHeaders.set(HttpHeaders.CONTENT_DISPOSITION,
                             ContentDisposition.builder("attachment").filename("OsaSaveExtractorUpdater.exe").build().toString());
        FileSystemResource extractorResource = new FileSystemResource(properties.getExtractorPath());

        this.extractorResponse = new ResponseEntity<>(extractorResource, extractorHeaders, HttpStatus.OK);

        HttpHeaders editorHeaders = new HttpHeaders();
        editorHeaders.set(HttpHeaders.CONTENT_TYPE, "application/vnd.microsoft.portable-executable");
        editorHeaders.set(HttpHeaders.CONTENT_DISPOSITION,
                          ContentDisposition.builder("attachment").filename("OsaSaveEditorUpdater.exe").build().toString());
        FileSystemResource editorResource = new FileSystemResource(properties.getEditorPath());

        this.editorResponse = new ResponseEntity<>(editorResource, editorHeaders, HttpStatus.OK);

        HttpHeaders versionHeaders = new HttpHeaders();
        versionHeaders.setContentType(MediaType.TEXT_PLAIN);

        this.versionResponse = new ResponseEntity<>(properties.getMinExtractorVersion(), versionHeaders, HttpStatus.OK);
    }

    @GetMapping("/download-extractor")
    public ResponseEntity<FileSystemResource> getExtractor() {
        return this.extractorResponse;
    }

    @GetMapping("/download-editor")
    public ResponseEntity<FileSystemResource> getEditor() {
        return this.editorResponse;
    }

    @GetMapping("/api/version")
    public ResponseEntity<String> getMinVersion() {
        return this.versionResponse;
    }
}
