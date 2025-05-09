package com.github.alexeysol.geekregime.apiposts.shared.util;

import com.github.alexeysol.geekregime.apicommons.constant.Default;
import com.github.alexeysol.geekregime.apicommons.generated.model.IdResponse;
import lombok.experimental.UtilityClass;

@UtilityClass
public class DataAccessHelper {
    public long getMutationResult(long id, int mutatedRowCount) {
        boolean isMutated = mutatedRowCount > 0;

        if (isMutated) {
            return id;
        }

        return Default.NOT_FOUND_BY_ID;
    }

    public IdResponse getIdResponse(Long id) {
        return new IdResponse(id);
    }
}
