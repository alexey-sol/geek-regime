package com.github.alexeysol.geekregimeapiposts;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.github.alexeysol.geekregimeapicommons.utils.Json;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GeekRegimeApiPostsApplication {
	public static void main(String[] args) {
		SpringApplication.run(GeekRegimeApiPostsApplication.class, args);
		Json.configureDeserialization(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}
}
