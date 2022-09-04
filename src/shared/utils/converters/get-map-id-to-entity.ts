import { HasId } from "@/shared/types/models";

export const getMapIdToEntity = <
    Key extends number | string,
    Value extends HasId<Key>
>(items: Value[]) => {
    const initialMapIdToEntity = {} as Record<Key, Value>;

    return items.reduce((mapIdToEntity, item) => {
        mapIdToEntity[item.id] = item;
        return mapIdToEntity;
    }, initialMapIdToEntity);
};
