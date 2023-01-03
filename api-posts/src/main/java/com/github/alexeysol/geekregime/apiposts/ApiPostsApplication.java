package com.github.alexeysol.geekregime.apiposts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ApiPostsApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApiPostsApplication.class, args);
	}
}
