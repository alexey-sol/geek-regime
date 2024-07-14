import type { HasId } from "@eggziom/geek-regime-js-commons";

import type { PagingOptions } from "@/shared/models/entities";
import type { UserPostDetails } from "@/features/posts/models/entities";
import type { CreatePostRequest, UpdatePostRequest } from "@/features/posts/models/dtos";

export type GetAllPostsArg = {
    filter?: {
        authorId?: HasId["id"];
    };
    paging: Pick<PagingOptions, "page" | "size">;
};

export type GetPostBySlugArg = UserPostDetails["slug"];

export type CreatePostArg = CreatePostRequest;

export type RemovePostByIdArg = HasId["id"];

export type UpdatePostByIdArg = HasId & UpdatePostRequest;
