import { type HasId } from "@eggziom/geek-regime-js-utils";

import { postCommentsApi } from "@/features/posts/services/post-comments-api";
import { mapPagingQueryParams, mapSearchPagingQueryParams } from "@/shared/utils/api";
import { omitUndefined } from "@/shared/utils/helpers/object";
import {
    type GetAllPostsArg,
    type GetAllPostsByAuthorArg,
    type GetAllPostsBySpaceArg,
} from "@/features/posts/services/posts-api/types";
import { type GetPostCommentsByAuthorArg, type GetAllPostCommentsArg } from "@/features/posts/services/post-comments-api/types";
import { type CreatePostOnSaveArg, type UpdatePostOnSaveArg } from "@/features/posts/utils/hooks/types";
import { type PeriodAndSortQueryParams, type PagingQueryParams, type SortValue } from "@/shared/types";
import { type HasAuthorId } from "@/features/posts/types";

const MAP_SORT_VALUE_TO_QUERY_PARAM: Record<SortValue, string> = {
    LATEST: "createdAt,DESC",
    OLDEST: "createdAt,ASC",
};

const DEFAULT_SEARCH_IN = ["title", "body"];

export const mapPeriodAndSortQueryParams = ({
    period,
    sort,
}: PeriodAndSortQueryParams<SortValue>): PeriodAndSortQueryParams => {
    const params: PeriodAndSortQueryParams = {};

    if (period !== undefined) {
        params.period = period;
    }

    if (sort !== undefined) {
        params.sort = MAP_SORT_VALUE_TO_QUERY_PARAM[sort];
    }

    return params;
};

type HasSort = Pick<PeriodAndSortQueryParams<SortValue>, "sort">;

export const mapGetAllPostsArg = ({
    period,
    searchIn = DEFAULT_SEARCH_IN,
    sort,
    ...rest
}: Omit<GetAllPostsArg, "sort"> & Partial<HasSort>): GetAllPostsArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
    ...mapPeriodAndSortQueryParams({ period, sort }),
});

export const mapGetAllPostsByAuthorArg = ({
    authorId,
    period,
    searchIn = DEFAULT_SEARCH_IN,
    sort,
    ...rest
}: Omit<GetAllPostsByAuthorArg, "sort"> & Partial<HasSort>): GetAllPostsByAuthorArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
    ...mapPeriodAndSortQueryParams({ period, sort }),
    authorId,
});

export const mapGetAllPostsBySpaceArg = ({
    period,
    searchIn = DEFAULT_SEARCH_IN,
    sort,
    spaceId,
    ...rest
}: Omit<GetAllPostsBySpaceArg, "sort"> & Partial<HasSort>): GetAllPostsBySpaceArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
    ...mapPeriodAndSortQueryParams({ period, sort }),
    spaceId,
});

export const mapGetAllPostCommentsArg = (
    arg: GetAllPostCommentsArg,
): GetAllPostCommentsArg => ({
    ...arg,
    params: mapPagingQueryParams(arg.params),
});

type MapGetPostCommentsByAuthorArg = PagingQueryParams & PeriodAndSortQueryParams<SortValue>
    & HasAuthorId;

export const mapGetProfilePostCommentsArg = ({
    authorId,
    period,
    sort,
    ...rest
}: MapGetPostCommentsByAuthorArg): GetPostCommentsByAuthorArg => ({
    authorId,
    params: {
        ...mapPagingQueryParams(rest),
        ...mapPeriodAndSortQueryParams({ period, sort }),
    },
});

type SavePostArg = CreatePostOnSaveArg | UpdatePostOnSaveArg;

export const mapCreateOrUpdatePostArg = ({ spaces, ...rest }: SavePostArg): SavePostArg =>
    omitUndefined({
        ...rest,
        spaces: spaces?.filter(({ title }) => !!title.trim())
            .map(({ title }) => ({ title })),
    });

export const getCreateCommentKey = (): string =>
    postCommentsApi.endpoints.createPostComment.name;

export const getRemoveCommentKey = (id: HasId["id"]): string =>
    `${postCommentsApi.endpoints.removePostCommentById.name}-${id}`;

export const getUpdateCommentKey = (id: HasId["id"]): string =>
    `${postCommentsApi.endpoints.updatePostCommentById.name}-${id}`;
