package com.github.alexeysol.geekregime.apiaggregator.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.http.HttpClient;
import java.time.Duration;

@Configuration
public class HttpClientConfig {
    final Duration DEFAULT_CONNECT_TIMEOUT = Duration.ofSeconds(45);

    @Bean
    public HttpClient httpClient() {
//        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(30 * 1000).build();
//        return HttpClientBuilder.create().setDefaultRequestConfig(requestConfig).build();
        return HttpClient.newBuilder()
            .connectTimeout(DEFAULT_CONNECT_TIMEOUT)
            .build();
    }
}
