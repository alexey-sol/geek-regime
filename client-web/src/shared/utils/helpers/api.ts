import { type PagingOptions, type QueryParams } from "@/shared/types";

export const getQueryParams = (
    { page, size }: PagingOptions,
    text?: string,
    searchIn?: string[],
): QueryParams => {
    const params: QueryParams = { page, size };

    if (text !== undefined) {
        params.text = text;
    }

    if (searchIn) {
        params.searchIn = searchIn;
    }

    return params;
};
