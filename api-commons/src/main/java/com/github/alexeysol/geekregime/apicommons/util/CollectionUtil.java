package com.github.alexeysol.geekregime.apicommons.util;

import lombok.experimental.UtilityClass;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@UtilityClass
public class CollectionUtil {
    public <T> List<T> objectToList(Object collection, Class<? extends T> valueType) throws ClassCastException {
        if (!(collection instanceof Collection<?> rawCollection)) {
            throw new ClassCastException("Object argument must be an instance of Collection");
        }

        List<T> list = new ArrayList<>(rawCollection.size());

        for (Object item : rawCollection) {
            list.add(valueType.cast(item));
        }

        return list;
    }

    public static <T> List<T> randomSubList(List<T> list, int subListSize) {
        var shuffledList = new ArrayList<>(list);
        Collections.shuffle(shuffledList);

        return shuffledList.subList(0, subListSize);
    }
}
