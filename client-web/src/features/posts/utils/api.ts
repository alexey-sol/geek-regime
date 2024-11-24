import {
    normalizeFilteredSearchPagingQueryParams,
    normalizePagingQueryParams,
} from "@/shared/utils/api";
import { type GetAllPostsArg } from "@/features/posts/services/posts-api/types";
import { type GetAllPostCommentsArg } from "@/features/posts/services/post-comments-api/types";

export const normalizeGetAllPostsArg = ({
    searchIn = ["title", "body"],
    ...rest
}: GetAllPostsArg["params"]): GetAllPostsArg => ({
    params: normalizeFilteredSearchPagingQueryParams({
        ...rest,
        searchIn,
    }),
});

export const normalizeGetAllPostCommentsArg = (
    arg: GetAllPostCommentsArg,
): GetAllPostCommentsArg => ({
    ...arg,
    params: normalizePagingQueryParams(arg.params),
});
