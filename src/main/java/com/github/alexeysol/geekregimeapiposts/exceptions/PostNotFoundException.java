package com.github.alexeysol.geekregimeapiposts.exceptions;

import com.github.alexeysol.geekregimeapiposts.constants.ExceptionMessageConstants;
import com.github.alexeysol.geekregimeapiposts.utils.Pair;

public class PostNotFoundException extends ResourceNotFoundException {
    public PostNotFoundException(Long id) {
        super(ExceptionMessageConstants.POST_NOT_FOUND, new Pair<>("id", id.toString()));
    }

    public PostNotFoundException() {
        super(ExceptionMessageConstants.POST_NOT_FOUND);
    }
}
