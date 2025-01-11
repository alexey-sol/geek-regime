import { defaults } from "@/shared/const";
import {
    type FilteredSearchPagingQueryParams,
    type HasPagingQueryParams,
    type Page,
    type PagingQueryParams,
    type SearchPagingQueryParams,
} from "@/shared/types";

const PAGE_OFFSET = 1; // this is the value we subtract from page number when passing it to API

const normStartPage = defaults.START_PAGE - PAGE_OFFSET;

export const normalizePagingQueryParams = ({
    page = defaults.START_PAGE,
    size = defaults.PAGE_SIZE,
}: PagingQueryParams = {}): Required<PagingQueryParams> => ({
    page: page - PAGE_OFFSET,
    size,
});

export const normalizeSearchPagingQueryParams = ({
    searchIn,
    text,
    ...pagingParams
}: SearchPagingQueryParams): SearchPagingQueryParams => {
    const params: SearchPagingQueryParams = normalizePagingQueryParams(pagingParams);

    if (text !== undefined) {
        params.text = text;
    }

    if (searchIn) {
        params.searchIn = searchIn;
    }

    return params;
};

export const normalizeFilteredSearchPagingQueryParams = <T>({
    filter,
    ...rest
}: FilteredSearchPagingQueryParams<T>): FilteredSearchPagingQueryParams<T> => {
    const params: FilteredSearchPagingQueryParams<T> = normalizeSearchPagingQueryParams(rest);

    if (filter) {
        params.filter = filter;
    }

    return params;
};

export const mergePageContent = <T>(
    currentCache: Page<T>,
    response: Page<T>,
    otherArgs: {
        arg?: HasPagingQueryParams;
    },
): Page<T> => {
    // If this is the start page number, or we need a specific, non-standard page size (when
    // sorting, for example), return fetched content as is.
    // Otherwise, merge the fetched content with the existing one for infinite scroll.
    const isStartPage = otherArgs.arg?.params.page === normStartPage;
    const isSpecificSizeRequired = otherArgs.arg?.params.size !== defaults.PAGE_SIZE;

    if (isStartPage || isSpecificSizeRequired) {
        return response;
    }

    return {
        ...response,
        size: currentCache.size + response.size,
        content: [...currentCache.content, ...response.content],
    };
};

type HasMoreArg<T> = Partial<{
    data: Partial<Pick<Page<T>, "content" | "totalElements">>;
    isError: boolean;
    isFetching: boolean;
    isLoading: boolean;
}>;

export const hasMore = <T>({
    data = {},
    isError = false,
    isFetching = false,
    isLoading = false,
}: HasMoreArg<T> | undefined = {}): boolean => {
    const { content = [], totalElements = 0 } = data;
    const contentLength = content?.length ?? 0;

    return !isError
        && !isFetching
        && !isLoading
        && totalElements > 0
        && totalElements > contentLength;
};