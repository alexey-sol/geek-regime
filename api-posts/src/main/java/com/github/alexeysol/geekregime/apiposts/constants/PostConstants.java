package com.github.alexeysol.geekregime.apiposts.constants;

import java.util.List;

public class PostConstants {
    public static final String ID_FIELD = "id";
    public static final String SLUG_FIELD = "slug";
    public static final List<String> SEARCHABLE_FIELDS = List.of("title", "excerpt");
    public static final List<String> SORTABLE_FIELDS = List.of(ID_FIELD, SLUG_FIELD, "createdAt",
        "title", "updatedAt");
    public static final String EXCERPT_ENDING = "…";
    public static final int MAX_EXCERPT_LENGTH = 300;
}
