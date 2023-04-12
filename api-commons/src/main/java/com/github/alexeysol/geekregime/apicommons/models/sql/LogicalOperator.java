package com.github.alexeysol.geekregime.apicommons.models.sql;

public enum LogicalOperator {
    AND("and"),
    OR("or");

    private final String value;

    LogicalOperator(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
