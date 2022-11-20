import type { HasId, PagingOptions } from "@/shared/types/models";
import type { CreatePostDto, UpdatePostDto } from "@/features/posts/models/dtos";

export type GetAllPostsArg = Pick<PagingOptions, "page" | "size">;

export type CreatePostArg = CreatePostDto;

export type UpdatePostByIdArg = HasId & UpdatePostDto;
