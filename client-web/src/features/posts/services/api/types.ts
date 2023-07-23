import type { HasId } from "@eggziom/geek-regime-js-commons";

import type { PagingOptions } from "@/shared/models/entities";
import type { CreatePostDto, UpdatePostDto } from "@/features/posts/models/dtos";
import type { PostDetails } from "@/features/posts/models/entities";

export type GetAllPostsArg = {
    filter?: {
        authorId?: HasId["id"];
    };
    paging: Pick<PagingOptions, "page" | "size">;
};

export type GetPostBySlugArg = PostDetails["slug"];

export type CreatePostArg = CreatePostDto;

export type RemovePostByIdArg = HasId["id"];

export type UpdatePostByIdArg = HasId & UpdatePostDto;
