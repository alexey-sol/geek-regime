package com.github.alexeysol.geekregimeapicommons.models.sources;

import com.github.alexeysol.geekregimeapicommons.models.Profile;

public interface ActiveProfile {
    String getActiveProfile();

    default boolean isProduction() {
        String prodProfile = Profile.PROD.getValue();
        return prodProfile.equals(getActiveProfile());
    }
}
