package com.github.alexeysol.geekregime.apiposts.config;

import com.github.alexeysol.geekregime.apicommons.config.ApiExceptionHandler;
import com.github.alexeysol.geekregime.apiposts.util.source.ApiPostsSource;
import org.springframework.web.bind.annotation.ControllerAdvice;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.POSTS;

@ControllerAdvice
public class PostsExceptionHandler extends ApiExceptionHandler {
    public PostsExceptionHandler(ApiPostsSource source) {
        super(POSTS, source.isProduction());
    }
}
