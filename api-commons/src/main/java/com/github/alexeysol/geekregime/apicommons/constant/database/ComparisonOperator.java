package com.github.alexeysol.geekregime.apicommons.constant.database;

public enum ComparisonOperator {
    EQUAL("equal"),
    LIKE("like"),
    ILIKE("ilike"),
    IN("in"),
    SAME_OR_AFTER("sameOrAfter");

    private final String value;

    ComparisonOperator(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
