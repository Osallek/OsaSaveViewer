package fr.osallek.osasaveviewer.config;

import fr.osallek.osasaveviewer.common.CustomEncodedResourceResolver;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

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
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        ClassPathResource index = new ClassPathResource("/viewer/index.html");

        registry.addResourceHandler("/favicon.ico")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.MINUTES))
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/robots.txt")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/data/users/**")
                .addResourceLocations("file:" + this.properties.getUsersFolder() + "/")
                .setCacheControl(CacheControl.noCache())
                .resourceChain(false)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/data/saves/*.png")
                .addResourceLocations("file:" + this.properties.getDataSavesFolder() + "/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
                .resourceChain(false)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/data/saves/**")
                .addResourceLocations("file:" + this.properties.getDataSavesFolder() + "/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
                .resourceChain(false)
                .addResolver(new CustomEncodedResourceResolver());

        registry.addResourceHandler("/data/save/**")
                .addResourceLocations("file:" + this.properties.getSavesFolder() + "/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
                .resourceChain(false)
                .addResolver(new CustomEncodedResourceResolver());

        registry.addResourceHandler("/data/**")
                .addResourceLocations("file:" + this.properties.getDataFolder() + "/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
                .resourceChain(false)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/eu4/**")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/eu4/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS))
                .setOptimizeLocations(true)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/static/**")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/static/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS))
                .setOptimizeLocations(true)
                .resourceChain(true)
                .addResolver(new PathResourceResolver());

        registry.addResourceHandler("/", "/index.html")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.MINUTES))
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) {
                        return index;
                    }
                });

        registry.addResourceHandler("/extractor_*.png")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/viewer/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.MINUTES))
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

        registry.addResourceHandler("/**")
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
    }

    @Bean
    public FilterRegistrationBean<UserAgentFilter> loggingFilter() {
        FilterRegistrationBean<UserAgentFilter> registrationBean = new FilterRegistrationBean<>();

        registrationBean.setFilter(new UserAgentFilter());
        registrationBean.addUrlPatterns("/user/*", "/save/*", "/save/*/");

        return registrationBean;
    }
}
