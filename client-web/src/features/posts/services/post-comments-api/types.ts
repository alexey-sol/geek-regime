import { type HasId } from "@eggziom/geek-regime-js-utils";

import { type HasPagingQueryParams, type HasPeriodAndSortQueryParams } from "@/shared/types";
import { type CreatePostCommentRequest, type UpdatePostCommentRequest } from "@/features/posts/models/dtos";
import { type HasAuthorId } from "@/features/posts/types";

type HasPostId = {
    postId: HasId["id"];
};

export type HasPostSlug = {
    postSlug: string;
};

export type HasRootCommentId = {
    rootCommentId: HasId["id"];
};

export type GetAllPostCommentsArg = HasPagingQueryParams & HasPostId;

export type GetPostCommentsByAuthorArg = HasPagingQueryParams & HasPeriodAndSortQueryParams
    & HasAuthorId;

export type CreatePostCommentArg = CreatePostCommentRequest & {
    meta: Partial<HasRootCommentId> & HasPostSlug;
};

export type RemovePostCommentByIdArg = HasId & {
    meta: HasRootCommentId & HasPostId & HasPostSlug;
};

export type UpdatePostCommentByIdArg = HasId & UpdatePostCommentRequest & {
    meta: HasRootCommentId & HasPostId;
};
