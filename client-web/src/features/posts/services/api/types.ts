import type { HasId } from "js-commons/src/types/props";

import type { PagingOptions } from "@/shared/models/entities";
import type { CreatePostDto, UpdatePostDto } from "@/features/posts/models/dtos";
import type { PostDetails } from "@/features/posts/models/entities";

export type GetAllPostsArg = Pick<PagingOptions, "page" | "size"> | undefined;

export type GetPostBySlugArg = PostDetails["slug"];

export type CreatePostArg = CreatePostDto;

export type RemovePostByIdArg = HasId["id"];

export type UpdatePostByIdArg = HasId & UpdatePostDto;
