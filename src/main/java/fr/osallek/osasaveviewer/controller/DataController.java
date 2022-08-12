package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.controller.dto.DataMetaDTO;
import fr.osallek.osasaveviewer.service.DataService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/data")
public class DataController {

    private final DataService dataService;

    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> receiveAssets(@RequestPart("assets") MultipartFile file, @RequestPart("data") DataMetaDTO data) throws IOException {
        this.dataService.receiveAssets(file, data);

        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> receiveSave(@RequestPart("save") MultipartFile file, @RequestPart("data") DataMetaDTO data) throws IOException {
        this.dataService.receiveSave(file, data);

        return ResponseEntity.noContent().build();
    }
}
