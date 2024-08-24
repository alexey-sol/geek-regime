import { type QueryParams } from "@/shared/types";

const PAGE_OFFSET = 1;

export const transformQueryParams = (params?: QueryParams): QueryParams | undefined => {
    if (!params) {
        return undefined;
    }

    const result: QueryParams = { ...params };

    if (result.page) {
        result.page -= PAGE_OFFSET;
    }

    return result;
};
