import { resources } from "@eggziom/geek-regime-js-commons";

import { getApiPath } from "@/shared/utils/formatters/api-path";

import * as cn from "./const";

const API_VERSION = 1;

export const usersBaseUrl = getApiPath(API_VERSION, resources.USERS);

export const createTag = (id: string | number = cn.TAG_LIST_ID): {
    id: string | number;
    type: typeof cn.USERS_TAG_TYPE;
} => ({
    id,
    type: cn.USERS_TAG_TYPE,
});
