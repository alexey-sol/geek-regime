import { HasId } from "@eggziom/geek-regime-js-commons";

type Page<E = unknown> = {
    content: E[];
    size: number;
    totalElements: number;
};

export type PagingOptions = Pick<Page, "size" | "totalElements"> & {
    page: number;
};

export type QueryParams = Partial<Pick<PagingOptions, "page" | "size"> & {
    text?: string;
    searchIn?: string[];
}>;

export type HasItem<E extends HasId> = {
    item: E;
};

export type HasPathPrefix = {
    pathPrefix: string;
};
