package com.github.alexeysol.geekregimeapiposts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GeekRegimeApiPostsApplication {
	public static void main(String[] args) {
		SpringApplication.run(GeekRegimeApiPostsApplication.class, args);
	}
}
