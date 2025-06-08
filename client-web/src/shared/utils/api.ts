import { t } from "i18next";

import { defaults } from "@/shared/const";
import {
    type HasPagingQueryParams,
    type Page,
    type PagingQueryParams,
    type SearchPagingQueryParams,
} from "@/shared/types";
import { type ApiError } from "@/shared/models/dtos";
import { hasData, isApiError, isApiErrorDetail } from "@/shared/utils/guards";

const PAGE_OFFSET = 1; // this is the value we subtract from page number when passing it to API

const normStartPage = defaults.START_PAGE - PAGE_OFFSET;

export const mapPagingQueryParams = ({
    page = defaults.START_PAGE,
    size = defaults.PAGE_SIZE,
}: PagingQueryParams = {}): Required<PagingQueryParams> => ({
    page: page - PAGE_OFFSET,
    size,
});

export const mapSearchPagingQueryParams = ({
    searchIn,
    text,
    ...pagingParams
}: SearchPagingQueryParams): SearchPagingQueryParams => {
    const params: SearchPagingQueryParams = mapPagingQueryParams(pagingParams);

    if (text !== undefined) {
        params.text = text.trim();

        if (searchIn) {
            params.searchIn = searchIn;
        }
    }

    return params;
};

export const mergePageContent = <T>(
    currentCache: Page<T>,
    response: Page<T>,
    otherArgs: {
        arg?: HasPagingQueryParams;
    },
    pageSize = defaults.PAGE_SIZE,
): Page<T> => {
    // If this is the start page number, or we need a specific, non-standard page size (when
    // sorting, for example), return fetched content as is.
    // Otherwise, merge the fetched content with the existing one for infinite scroll.
    const isStartPage = otherArgs.arg?.params.page === normStartPage;
    const isSpecificSizeRequired = otherArgs.arg?.params.size !== pageSize;

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

export const getApiErrorIfPossible = (response: unknown): ApiError | undefined =>
    (hasData(response) && isApiError(response.data) ? response.data : undefined);

export const getErrorMessage = ({ details, resource }: ApiError): string => {
    const messages = resource
        ? details.filter(isApiErrorDetail)
            .map(({ field, code }) => t(`shared.query.error.${resource}.${field}.${code}`))
            .filter(Boolean)
        : [];

    return messages.length
        ? messages.join(", ")
        : t("shared.query.error.message.default");
};
