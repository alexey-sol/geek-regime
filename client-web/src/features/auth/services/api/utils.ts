import * as cn from "./const";

export const createTag = (): {
    type: typeof cn.PROFILE_TYPE;
} => ({
    type: cn.PROFILE_TYPE,
});
