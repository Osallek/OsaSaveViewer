package fr.osallek.osasaveviewer.config;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserAgentFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String userAgent = StringUtils.trimToNull(request.getHeader(HttpHeaders.USER_AGENT));

        if (userAgent != null && (userAgent.contains("Discordbot/") || userAgent.contains("Googlebot/"))) {
            response.sendRedirect("/bot" + request.getServletPath());
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
