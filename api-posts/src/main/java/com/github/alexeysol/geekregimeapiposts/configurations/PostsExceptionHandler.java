package com.github.alexeysol.geekregimeapiposts.configurations;

import com.github.alexeysol.geekregimeapicommons.configurations.ApiExceptionHandler;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSource;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class PostsExceptionHandler extends ApiExceptionHandler {
    public PostsExceptionHandler(ApiPostsSource source) {
        super(source.getResource(), source.isProduction());
    }
}
