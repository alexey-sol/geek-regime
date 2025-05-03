package com.github.alexeysol.geekregime.apiposts.feature.post.constant;

import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class PostConstant {
    public final String ID_FIELD = "id";
    public final String SLUG_FIELD = "slug";
    public final List<String> SEARCHABLE_FIELDS = List.of("title", "excerpt");
    public final String EXCERPT_ENDING = "…";
    public final int MAX_EXCERPT_LENGTH = 300;
}
