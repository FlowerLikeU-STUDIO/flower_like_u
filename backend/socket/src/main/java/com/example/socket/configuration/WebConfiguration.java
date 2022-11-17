package com.example.socket.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","https://localhost:3000",
                        "https://www.flowerlikeu.com","http://k7b2091.p.ssafy.io:8080").allowedMethods("*")
                .exposedHeaders("*")
                .allowCredentials(true);
    }
}