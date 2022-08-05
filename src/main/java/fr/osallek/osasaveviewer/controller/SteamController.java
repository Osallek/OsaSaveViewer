package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.config.ApplicationProperties;
import fr.osallek.osasaveviewer.service.SessionService;
import fr.osallek.osasaveviewer.service.SteamService;
import fr.osallek.osasaveviewer.service.object.UserInfo;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/steam")
public class SteamController {

    private final SteamService steamService;

    private final SessionService sessionService;

    private final ApplicationProperties properties;

    public SteamController(SteamService steamService, SessionService sessionService, ApplicationProperties properties) {
        this.steamService = steamService;
        this.sessionService = sessionService;
        this.properties = properties;
    }

    @GetMapping("/login")
    public ResponseEntity<Void> login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Optional<UserInfo> userInfo = this.steamService.login(request.getParameterMap());

        userInfo.ifPresent(info -> response.addCookie(this.sessionService.createCookie(info.getId())));

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(this.properties.getFrontUrl());
        return new ResponseEntity<>(null, headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        response.addCookie(this.sessionService.removeCookie());

        return ResponseEntity.noContent().build();
    }
}
