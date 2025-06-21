import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type PagePeriod } from "@/shared/models/dtos";

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
    searchIn?: string[];
    text?: string;
};

export type PeriodAndSortQueryParams<S extends string = string> = {
    period?: PagePeriod;
    sort?: S;
};

export type HasItem<E extends HasId> = {
    item: E;
};

export type HasPathPrefix = {
    pathPrefix: string;
};

export type HasTitle = {
    title: string;
};

export type HasPagingQueryParams = {
    params: PagingQueryParams;
};

export type HasSearchPagingQueryParams = {
    params: SearchPagingQueryParams;
};

export type HasPeriodAndSortQueryParams<S extends string = string> = {
    params: PeriodAndSortQueryParams<S>;
};

export type HasDisableFailureNotificationOnStatus = {
    disableFailureNotificationOnStatus: number;
};

export type HasUnwrap<T = unknown> = {
    unwrap: () => Promise<T>;
};

/** Make all the fields except "id" optional. */
export type MaybeStubItem<T extends HasId> = Partial<Omit<T, "id">> & Pick<T, "id">;

export type SortValue = "LATEST" | "OLDEST";
