package com.ssafy.fly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class FlyApplication {

    public static void main(String[] args) {
        SpringApplicationBuilder springApplicationBuilder = new SpringApplicationBuilder(FlyApplication.class);
        springApplicationBuilder.properties("spring.config.location="
                + "classpath:/application.yml, "
                + "classpath:/application-database.yml, "
                + "classpath:/application-env.yml");
        SpringApplication springApplication = springApplicationBuilder.build();
        springApplication.run(args);
    }
}
