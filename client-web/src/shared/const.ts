import { type PagingOptions } from "./types";

export enum Language {
    EN = "en",
    RU = "ru"
}

export const defaults = {
    START_PAGE: 1,
    PAGE_SIZE: 10,
};

export const dom = {
    ROOT_ELEMENT_ID: "root",
};

export const paths = {
    COMMENTS: "comments",
    CREATE: "create",
    PAGE: "page",
    POSTS: "posts",
    SETTINGS: "settings",
    UPDATE: "update",
    USERS: "users",
};

export const DEFAULT_PAGING_OPTIONS: PagingOptions = {
    page: defaults.START_PAGE,
    size: defaults.PAGE_SIZE,
    totalElements: 0,
};
