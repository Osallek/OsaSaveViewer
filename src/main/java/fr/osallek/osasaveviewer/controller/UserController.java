package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.common.Constants;
import fr.osallek.osasaveviewer.service.UserService;
import fr.osallek.osasaveviewer.service.object.UserInfo;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/profile", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserInfo> get(@CookieValue(value = Constants.COOKIE_NAME, required = false) Optional<String> id) throws IOException {
        if (id.isEmpty()) {
            return ResponseEntity.ok(null);
        } else {
            return ResponseEntity.ok(this.userService.getOrCreateUserInfo(id.get()));
        }
    }
}
