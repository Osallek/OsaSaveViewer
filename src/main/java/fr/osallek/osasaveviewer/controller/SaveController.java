package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.controller.dto.ServerSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.UploadResponseDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ExtractorSaveDTO;
import fr.osallek.osasaveviewer.service.SaveService;
import java.io.IOException;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/save")
public class SaveController {

    private final SaveService saveService;

    public SaveController(SaveService saveService) {
        this.saveService = saveService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ServerSaveDTO>> get() throws IOException {
        return ResponseEntity.ok(this.saveService.getLastSaves());
    }

    @GetMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ServerSaveDTO>> edit(@PathVariable("userId") String userId) throws IOException {
        return ResponseEntity.ok(this.saveService.getSaveForUser(userId));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UploadResponseDTO> edit(@RequestBody ExtractorSaveDTO save) throws IOException {
        return ResponseEntity.ok(this.saveService.upload(save));
    }
}
