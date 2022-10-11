package com.github.alexeysol.geekregimeapiposts.configurations;

import com.github.alexeysol.geekregimeapicommons.configurations.ResourceExceptionHandler;
import com.github.alexeysol.geekregimeapiposts.utils.sources.ApiPostsSource;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class PostsExceptionHandler extends ResourceExceptionHandler {
    public PostsExceptionHandler(ApiPostsSource source) {
        super(source.getResource(), source.isProduction());
    }
}
