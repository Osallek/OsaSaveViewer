package fr.osallek.osasaveviewer.config;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class HeadersFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.addHeader("Cross-Origin-Opener-Policy", "same-origin");
        response.addHeader("Cross-Origin-Embedder-Policy", "require-corp");
        response.addHeader("Cross-Origin-Resource-Policy", "same-site");
        filterChain.doFilter(request, response);
    }
}
