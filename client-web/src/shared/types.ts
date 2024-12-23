import { type HasId } from "@eggziom/geek-regime-js-commons";

export type Page<E = unknown> = {
    content: E[];
    size: number;
    totalElements: number;
};

export type PagingOptions = Pick<Page, "size" | "totalElements"> & {
    page: number;
};

export type PagingQueryParams = Partial<Pick<PagingOptions, "page" | "size">>;

export type SearchPagingQueryParams = PagingQueryParams & {
    text?: string;
    searchIn?: string[];
};

export type FilteredSearchPagingQueryParams<T> = SearchPagingQueryParams & {
    filter?: T;
};

export type HasItem<E extends HasId> = {
    item: E;
};

export type HasPathPrefix = {
    pathPrefix: string;
};

export type HasPagingQueryParams = {
    params: PagingQueryParams;
};

export type HasSearchPagingQueryParams = {
    params: SearchPagingQueryParams;
};

export type HasFilteredSearchPagingQueryParams<T> = {
    params: FilteredSearchPagingQueryParams<T>;
};
