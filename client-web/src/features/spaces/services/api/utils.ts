import { type HasId } from "@eggziom/geek-regime-js-utils";

import * as cn from "./const";

export const createTag = (id: string | number = cn.SPACE_LIST_ID): {
    id: string | number;
    type: typeof cn.SPACES_TYPE;
} => ({
    id,
    type: cn.SPACES_TYPE,
});

type SpacesTag = ReturnType<typeof createTag>;

export const provideTags = (items?: HasId[]): SpacesTag[] => (items
    ? [...items.map(({ id }) => createTag(id)), createTag()]
    : [createTag()]);
