import { mapPagingQueryParams, mapSearchPagingQueryParams } from "@/shared/utils/api";
import { type GetAllPostsArg, GetAllPostsByAuthorArg } from "@/features/posts/services/posts-api/types";
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

type HasSort = Pick<PostsPageSettings, "sort">;

export const mapGetAllPostsArg = ({
    period,
    searchIn = ["title", "body"],
    sort,
    ...rest
}: Omit<GetAllPostsArg, "sort"> & Partial<HasSort>): GetAllPostsArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
    ...mapPeriodAndSortQueryParams({ period, sort }),
});

export const mapGetAllPostsByAuthorArg = ({
    authorId,
    period,
    searchIn = ["title", "body"],
    sort,
    ...rest
}: Omit<GetAllPostsByAuthorArg, "sort"> & Partial<HasSort>): GetAllPostsByAuthorArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
    ...mapPeriodAndSortQueryParams({ period, sort }),
    authorId,
});

export const mapGetAllPostCommentsArg = (
    arg: GetAllPostCommentsArg,
): GetAllPostCommentsArg => ({
    ...arg,
    params: mapPagingQueryParams(arg.params),
});
