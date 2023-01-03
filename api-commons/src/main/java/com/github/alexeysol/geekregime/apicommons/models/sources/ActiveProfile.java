package com.github.alexeysol.geekregime.apicommons.models.sources;

public interface ActiveProfile {
    String getActiveProfile();

    default boolean isProduction() {
        String prodProfile = Profile.PROD.value();
        return prodProfile.equals(getActiveProfile());
    }
}
