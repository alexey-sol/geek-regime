package com.github.alexeysol.geekregime.apicommons.model.source;

public interface ActiveProfile {
    String getActiveProfile();

    default boolean isProduction() {
        String prodProfile = Profile.PROD.value();
        return prodProfile.equals(getActiveProfile());
    }
}
