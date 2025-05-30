package fr.osallek.osasaveviewer.config;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserAgentFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String userAgent = StringUtils.trimToNull(request.getHeader(HttpHeaders.USER_AGENT));

        if (userAgent != null && (userAgent.contains("Discordbot/") || userAgent.contains("Googlebot/"))) {
            response.sendRedirect("/bot" + request.getServletPath().replace("/war/", "/warfare/")); //Ugly because war is a reserved word for Spring
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
