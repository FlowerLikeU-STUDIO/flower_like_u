package com.example.socket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class SocketApplication {

	public static void main(String[] args) {
		SpringApplicationBuilder springApplicationBuilder = new SpringApplicationBuilder(SocketApplication.class);
		springApplicationBuilder.properties("spring.config.location="
				+ "classpath:/application-database.properties");
		SpringApplication springApplication = springApplicationBuilder.build();
		springApplication.run(args);
		//SpringApplication.run(SocketApplication.class, args);

	}

}
