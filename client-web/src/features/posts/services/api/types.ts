import type { HasId } from "@eggziom/geek-regime-js-commons";

import type { UserPostDetails } from "@/features/posts/models/entities";
import type { CreatePostRequest, UpdatePostRequest } from "@/features/posts/models/dtos";
import { type PagingParams } from "@/shared/types";

export type GetAllPostsArg = {
    filter?: {
        authorId?: HasId["id"];
    };
    paging: PagingParams;
};

export type GetPostBySlugArg = UserPostDetails["slug"];

export type CreatePostArg = CreatePostRequest;

export type RemovePostByIdArg = HasId["id"];

export type UpdatePostByIdArg = HasId & UpdatePostRequest;
