import { type HasId } from "@eggziom/geek-regime-js-utils";

import * as cn from "./const";

export const createTag = (id: string | number = cn.POST_LIST_ID): {
    id: string | number;
    type: typeof cn.POSTS_TYPE;
} => ({
    id,
    type: cn.POSTS_TYPE,
});

type PostsTag = ReturnType<typeof createTag>;

export const provideTags = (items?: HasId[]): PostsTag[] => (items
    ? [...items.map(({ id }) => createTag(id)), createTag()]
    : [createTag()]);
