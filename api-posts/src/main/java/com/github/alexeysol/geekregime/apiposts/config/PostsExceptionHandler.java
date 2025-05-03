package com.github.alexeysol.geekregime.apiposts.config;

import com.github.alexeysol.geekregime.apicommons.config.ApiErrorHandler;
import com.github.alexeysol.geekregime.apiposts.shared.source.ApiPostsSource;
import org.springframework.web.bind.annotation.ControllerAdvice;

import static com.github.alexeysol.geekregime.apicommons.constant.ResourceConstant.POSTS;

@ControllerAdvice
public class PostsExceptionHandler extends ApiErrorHandler {
    public PostsExceptionHandler(ApiPostsSource source) {
        super(POSTS, source.isProduction());
    }
}
