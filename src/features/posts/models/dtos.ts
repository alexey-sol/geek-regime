import type { HasId, Page } from "@/shared/types/models";
import type { UserDto } from "@/features/users/models/dtos";

export type PostDto = HasId & {
    author: UserDto;
    body: string;
    createdAt: string;
    excerpt: string;
    slug: string;
    title: string;
    updatedAt: string;
};

export type CreatePostDto = Pick<PostDto, "title" | "body"> & {
    spaceId: number;
    userId: number;
};

export type UpdatePostDto = Partial<Pick<PostDto, "title" | "body">>;

export type PostsPage = Page<PostDto[]>;
