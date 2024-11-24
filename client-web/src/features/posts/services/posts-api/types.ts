import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type UserPostDetails } from "@/features/posts/models/entities";
import { type CreatePostRequest, type UpdatePostRequest } from "@/features/posts/models/dtos";
import { type HasFilteredSearchPagingQueryParams } from "@/shared/types";
import { type HasAuthorId } from "@/features/posts/types";

export type GetAllPostsArg = HasFilteredSearchPagingQueryParams<HasAuthorId>;

export type GetPostBySlugArg = UserPostDetails["slug"];

export type CreatePostArg = CreatePostRequest;

export type RemovePostByIdArg = HasId["id"];

export type UpdatePostByIdArg = HasId & UpdatePostRequest;

export type VoteOnPostArg = {
    postId: HasId["id"];
    userId: HasId["id"];
    value: number;
};
