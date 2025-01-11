import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type HasPagingQueryParams } from "@/shared/types";
import { type CreatePostCommentRequest, type UpdatePostCommentRequest } from "@/features/posts/models/dtos";
import { type RootCommentContextValue } from "@/features/posts/contexts/root-comment";

type HasPostId = {
    postId: HasId["id"];
};

export type GetAllPostCommentsArg = HasPagingQueryParams & HasPostId;

export type CreatePostCommentArg = CreatePostCommentRequest & {
    meta: Partial<Pick<RootCommentContextValue, "rootCommentId">> & {
        parentPostSlug?: string;
    };
};

export type UpdatePostCommentArg = HasId & UpdatePostCommentRequest;
