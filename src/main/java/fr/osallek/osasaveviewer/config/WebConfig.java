package fr.osallek.osasaveviewer.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.File;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final ApplicationProperties properties;

    public WebConfig(ApplicationProperties properties) {
        this.properties = properties;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins(this.properties.getFrontUrl().getScheme() + "://" + this.properties.getFrontUrl().getAuthority())
                .allowCredentials(true);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        ClassPathResource index = new ClassPathResource("/viewer/index.html");

        registry.addResourceHandler("/favicon.ico")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/robots.txt")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/viewer/eu4/**")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/eu4/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS))
                .setOptimizeLocations(true)
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) {
                        try {
                            location = location.createRelative(resourcePath);

                            return location.exists() && location.isReadable() ? location : index;
                        } catch (Exception e) {
                            return index;
                        }
                    }
                });

        registry.addResourceHandler("/viewer/**", "/viewer/", "/viewer")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) {
                        try {
                            location = location.createRelative(resourcePath);

                            return location.exists() && location.isReadable() ? location : index;
                        } catch (Exception e) {
                            return index;
                        }
                    }
                });

        registry.addResourceHandler("/data/users/**")
                .addResourceLocations("file:/" + this.properties.getUsersFolder() + File.separator)
                .setCacheControl(CacheControl.noCache())
                .resourceChain(false)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/data/saves/**")
                .addResourceLocations("file:/" + this.properties.getSavesFolder() + File.separator)
                .setCacheControl(CacheControl.maxAge(31536000, TimeUnit.SECONDS))
                .resourceChain(false)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/data/**")
                .addResourceLocations("file:/" + this.properties.getDataFolder() + File.separator)
                .setCacheControl(CacheControl.maxAge(31536000, TimeUnit.SECONDS))
                .resourceChain(false)
                .addResolver(new PathResourceResolver());
    }
}
