import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type HasPagingQueryParams } from "@/shared/types";
import { type CreatePostCommentRequest, type UpdatePostCommentRequest } from "@/features/posts/models/dtos";
import { type RootCommentContextValue } from "@/features/posts/contexts/root-comment";

type HasRootCommentId = Pick<RootCommentContextValue, "rootCommentId">;

export type GetAllPostCommentsArg = HasPagingQueryParams & {
    postId: HasId["id"];
};

export type CreatePostCommentArg = CreatePostCommentRequest & {
    meta?: Partial<HasRootCommentId> & {
        parentPostSlug?: string;
    };
};

export type UpdatePostCommentArg = HasId & UpdatePostCommentRequest & {
    meta: Partial<HasRootCommentId>;
};
