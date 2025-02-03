import {
    mapFilteredQueryParams,
    mapPagingQueryParams,
    mapSearchPagingQueryParams,
} from "@/shared/utils/api";
import { type GetAllPostsArg } from "@/features/posts/services/posts-api/types";
import { type GetAllPostCommentsArg } from "@/features/posts/services/post-comments-api/types";

import {
    type PeriodAndSortQueryParams,
    type PostSortValue,
    type PostsPageSettings,
} from "../types";

const MAP_SORT_VALUE_TO_QUERY_PARAM: Record<PostSortValue, string> = {
    LATEST: "id,DESC",
    OLDEST: "id,ASC",
};

export const mapPeriodAndSortQueryParams = ({
    period,
    sort,
}: Partial<PostsPageSettings>): PeriodAndSortQueryParams => {
    const params: PeriodAndSortQueryParams = {};

    if (period !== undefined) {
        params.period = period;
    }

    if (sort !== undefined) {
        params.sort = MAP_SORT_VALUE_TO_QUERY_PARAM[sort];
    }

    return params;
};

export const mapGetAllPostsArg = ({
    filter,
    period,
    searchIn = ["title", "body"],
    sort,
    ...rest
}: Omit<GetAllPostsArg, "sort"> & Partial<Pick<PostsPageSettings, "sort">>): GetAllPostsArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
    ...mapFilteredQueryParams({ filter }),
    ...mapPeriodAndSortQueryParams({ period, sort }),
});

export const mapGetAllPostCommentsArg = (
    arg: GetAllPostCommentsArg,
): GetAllPostCommentsArg => ({
    ...arg,
    params: mapPagingQueryParams(arg.params),
});
