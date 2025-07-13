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
    CONFIRMATION: "confirmation",
    CREATE: "create",
    DONE: "done",
    EMAIL: "email",
    INDEX: "/",
    PAGE: "page",
    POSTS: "posts",
    SEARCH: "search",
    SETTINGS: "settings",
    SPACES: "spaces",
    UPDATE: "update",
    USERS: "users",
};

export const SEARCH_PARAMS = {
    PERIOD: "period",
    SORT: "sort",
    TEXT: "text",
};

export const DEFAULT_PAGING_OPTIONS: PagingOptions = {
    page: defaults.START_PAGE,
    size: defaults.PAGE_SIZE,
    totalElements: 0,
};

export const API_PREFIX = "/api";
