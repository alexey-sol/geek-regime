import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type HasPagingQueryParams } from "@/shared/types";
import { type CreatePostCommentRequest, type UpdatePostCommentRequest } from "@/features/posts/models/dtos";
import { type RootCommentContextValue } from "@/features/posts/contexts/root-comment";

type HasPostId = {
    postId: HasId["id"];
};

export type HasPostSlug = {
    postSlug: string;
};

export type HasRootCommentId = Pick<RootCommentContextValue, "rootCommentId">;

export type GetAllPostCommentsArg = HasPagingQueryParams & HasPostId;

export type CreatePostCommentArg = CreatePostCommentRequest & {
    meta: Partial<HasRootCommentId> & HasPostSlug;
};

export type RemovePostCommentByIdArg = HasId & {
    meta: HasRootCommentId & HasPostId & HasPostSlug;
};

export type UpdatePostCommentByIdArg = HasId & UpdatePostCommentRequest & {
    meta: HasRootCommentId & HasPostId;
};
