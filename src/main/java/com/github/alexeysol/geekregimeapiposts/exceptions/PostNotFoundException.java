package com.github.alexeysol.geekregimeapiposts.exceptions;

import com.github.alexeysol.geekregimeapiposts.constants.ExceptionMessageConstants;
import com.github.alexeysol.geekregimeapiposts.utils.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class PostNotFoundException extends BaseApiPostsException {
    public PostNotFoundException(String message, Integer postId) {
        super(message, new Pair<String, String>("id", postId.toString()));
    }

    public PostNotFoundException(String message) {
        super(message);
    }

    public PostNotFoundException(Integer postId) {
        this(ExceptionMessageConstants.POST_NOT_FOUND, postId);
    }

    public PostNotFoundException() {
        this(ExceptionMessageConstants.POST_NOT_FOUND);
    }
}
