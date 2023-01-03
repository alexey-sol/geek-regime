package com.github.alexeysol.geekregime.apiposts.configurations;

import com.github.alexeysol.geekregime.apicommons.configurations.ApiExceptionHandler;
import com.github.alexeysol.geekregime.apiposts.utils.sources.ApiPostsSource;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class PostsExceptionHandler extends ApiExceptionHandler {
    public PostsExceptionHandler(ApiPostsSource source) {
        super(source.getResource(), source.isProduction());
    }
}
