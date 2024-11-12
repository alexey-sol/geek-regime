import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type UserPostDetails } from "@/features/posts/models/entities";
import { type CreatePostRequest, type UpdatePostRequest } from "@/features/posts/models/dtos";
import { type QueryParams } from "@/shared/types";

export type GetAllPostsArg = {
    filter?: {
        authorId?: HasId["id"];
    };
    params: QueryParams;
};

export type GetPostBySlugArg = UserPostDetails["slug"];

export type CreatePostArg = CreatePostRequest;

export type RemovePostByIdArg = HasId["id"];

export type UpdatePostByIdArg = HasId & UpdatePostRequest;

export type VoteForPostArg = {
    postId: HasId["id"];
    userId: HasId["id"];
    value: number;
};
