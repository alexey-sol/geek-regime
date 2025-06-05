import * as cn from "./const";

export const createTag = (id: string | number = cn.USER_LIST_ID): {
    id: string | number;
    type: typeof cn.USERS_TYPE;
} => ({
    id,
    type: cn.USERS_TYPE,
});
