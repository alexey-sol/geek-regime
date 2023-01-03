import type { HasId } from "@/shared/types/props";
import type { PagingOptions } from "@/shared/models/entities";
import type { CreatePostDto, UpdatePostDto } from "@/features/posts/models/dtos";
import type { Post } from "@/features/posts/models/entities";

export type GetAllPostsArg = Pick<PagingOptions, "page" | "size"> | undefined;

export type GetPostBySlugArg = Post["slug"];

export type CreatePostArg = CreatePostDto;

export type RemovePostByIdArg = HasId["id"];

export type UpdatePostByIdArg = HasId & UpdatePostDto;
