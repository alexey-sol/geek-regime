package com.github.alexeysol.geekregime.apicommons.constant.database;

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
