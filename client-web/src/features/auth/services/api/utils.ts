import * as cn from "./const";

export const createTag = (): {
    type: typeof cn.PROFILE_ID;
} => ({
    type: cn.PROFILE_ID,
});
