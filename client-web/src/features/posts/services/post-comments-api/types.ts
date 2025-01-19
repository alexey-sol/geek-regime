import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type HasPagingQueryParams } from "@/shared/types";
import { type CreatePostCommentRequest, type UpdatePostCommentRequest } from "@/features/posts/models/dtos";
import { type RootCommentContextValue } from "@/features/posts/contexts/root-comment";

export type CommentMutationMeta = Pick<RootCommentContextValue, "rootCommentId"> & {
    parentPostSlug: string;
};

export type GetAllPostCommentsArg = HasPagingQueryParams & {
    postId: HasId["id"];
};

export type CreatePostCommentArg = CreatePostCommentRequest & {
    meta?: Partial<CommentMutationMeta>;
};

export type RemovePostCommentByIdArg = HasId & {
    meta: CommentMutationMeta;
}

export type UpdatePostCommentByIdArg = HasId & UpdatePostCommentRequest & {
    meta?: Partial<Pick<CommentMutationMeta, "rootCommentId">>;
};
