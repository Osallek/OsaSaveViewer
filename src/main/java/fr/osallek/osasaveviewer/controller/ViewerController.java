package fr.osallek.osasaveviewer.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping
public class ViewerController {

    private final ResponseEntity<Void> root;

    public ViewerController() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/viewer"));
        this.root = new ResponseEntity<>(null, headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @GetMapping
    public ResponseEntity<Void> root() {
        return this.root;
    }
}
