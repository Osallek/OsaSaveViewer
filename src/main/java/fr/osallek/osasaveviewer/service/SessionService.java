package fr.osallek.osasaveviewer.service;

import fr.osallek.osasaveviewer.common.Constants;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;

@Service
public class SessionService {

    public Cookie createCookie(String id) {
        Cookie cookie = new Cookie(Constants.COOKIE_NAME, id);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(60 * 60 * 24 * 30);
        cookie.setPath("/");

        return cookie;
    }

    public Cookie removeCookie() {
        Cookie cookie = new Cookie(Constants.COOKIE_NAME, null);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        return cookie;
    }
}
