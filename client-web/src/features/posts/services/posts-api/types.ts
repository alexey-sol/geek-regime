import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type PostDetails } from "@/features/posts/models/entities";
import { type CreatePostRequest, type UpdatePostRequest } from "@/features/posts/models/dtos";
import { type HasAuthorId, type PeriodAndSortQueryParams } from "@/features/posts/types";
import { type SearchPagingQueryParams } from "@/shared/types";

export type GetAllPostsArg = SearchPagingQueryParams & PeriodAndSortQueryParams;

export type GetAllPostsByAuthorArg = GetAllPostsArg & HasAuthorId;

export type GetPostBySlugArg = PostDetails["slug"];

export type CreatePostArg = CreatePostRequest;

export type RemovePostByIdArg = HasId["id"];

export type UpdatePostByIdArg = HasId & UpdatePostRequest;

export type VoteOnPostArg = {
    postId: HasId["id"];
    userId: HasId["id"];
    value: number;
};
