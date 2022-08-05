package fr.osallek.osasaveviewer.service;

import fr.osallek.osasaveviewer.common.Constants;
import fr.osallek.osasaveviewer.config.ApplicationProperties;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.net.URI;

@Service
@Primary
@Profile("dev")
public class SessionServiceDev extends SessionService {

    private final ApplicationProperties properties;

    public SessionServiceDev(ApplicationProperties properties) {
        this.properties = properties;
    }

    @Override
    public Cookie createCookie(String id) {
        Cookie cookie = new Cookie(Constants.COOKIE_NAME, id);
        cookie.setSecure(false);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60 * 60 * 24 * 30);
        cookie.setPath("/");
        cookie.setDomain(this.properties.getFrontUrl().getHost());

        return cookie;
    }

    @Override
    public Cookie removeCookie() {
        Cookie cookie = new Cookie(Constants.COOKIE_NAME, null);
        cookie.setSecure(false);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setDomain(this.properties.getFrontUrl().getHost());

        return cookie;
    }
}
