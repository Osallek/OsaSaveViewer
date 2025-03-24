package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.common.Constants;
import fr.osallek.osasaveviewer.controller.dto.ServerSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.UploadResponseDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ExtractorSaveDTO;
import fr.osallek.osasaveviewer.service.SaveService;
import fr.osallek.osasaveviewer.service.object.UserInfo;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;
import java.util.SortedSet;

@RestController
@RequestMapping("/api/saves")
public class SaveController {

    private final SaveService saveService;

    public SaveController(SaveService saveService) {
        this.saveService = saveService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SortedSet<ServerSaveDTO>> get() {
        return ResponseEntity.ok(this.saveService.getLastSaves());
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserInfo> delete(@PathVariable("id") String id,
                                           @CookieValue(value = Constants.COOKIE_NAME, required = false) Optional<String> userId) throws IOException {
        return ResponseEntity.ok(this.saveService.delete(id, userId));
    }

    @GetMapping(value = "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SortedSet<ServerSaveDTO>> getUser(@PathVariable("userId") String userId) throws IOException {
        return ResponseEntity.ok(this.saveService.getSaveForUser(userId));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UploadResponseDTO> upload(@RequestBody ExtractorSaveDTO save) throws IOException {
        return ResponseEntity.ok(this.saveService.upload(save));
    }
}
