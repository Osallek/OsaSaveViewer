package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.controller.dto.DataAssetDTO;
import fr.osallek.osasaveviewer.service.DataService;
import java.io.IOException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/data")
public class DataController {

    private final DataService dataService;

    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> edit(@RequestPart("assets") MultipartFile file, @RequestPart("data") DataAssetDTO data) throws IOException {
        this.dataService.receive(file, data);

        return ResponseEntity.noContent().build();
    }
}
