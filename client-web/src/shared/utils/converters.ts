import { type PagingParams } from "@/shared/types";

const PAGE_OFFSET = 1;

export const transformPagingParams = (paging?: PagingParams): PagingParams | undefined => {
    if (paging) {
        return {
            ...paging,
            page: paging.page - PAGE_OFFSET,
        };
    }

    return undefined;
};
