package com.github.alexeysol.geekregime.apicommons.models.sql;

public enum ComparisonOperator {
    EQUAL("equal"),
    LIKE("like"),
    ILIKE("ilike"),
    IN("in");

    private final String value;

    ComparisonOperator(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
