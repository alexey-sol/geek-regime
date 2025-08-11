import { resources } from "@eggziom/geek-regime-js-utils";

import { paths } from "@/shared/const";
import { createAbsolutePath } from "@/shared/utils/helpers/url";

export const createAbsoluteSearchPath = (...segments: string[]): string =>
    createAbsolutePath(paths.SEARCH, ...segments);

const INITIAL_SEARCH_RESOURCE = resources.POSTS;

export const getSearchBoxTitleKey = (resource = INITIAL_SEARCH_RESOURCE): string =>
    `search.searchBar.tabs.${resource}.title`;

export const getSearchBoxPlaceholderKey = (resource = INITIAL_SEARCH_RESOURCE): string =>
    `search.searchBar.tabs.${resource}.input.placeholder`;
