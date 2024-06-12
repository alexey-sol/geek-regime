package com.github.alexeysol.geekregime.apicommons.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ObjectCasting {
    public static <ValueType> List<ValueType> objectToList(
        Object collection,
        Class<? extends ValueType> valueType
    ) throws ClassCastException {
        if (!(collection instanceof Collection<?> rawCollection)) {
            throw new ClassCastException("Object argument must be an instance of Collection");
        }

        List<ValueType> list = new ArrayList<>(rawCollection.size());

        for (Object item : rawCollection) {
            list.add(valueType.cast(item));
        }

        return list;
    }
}
