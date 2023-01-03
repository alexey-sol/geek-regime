import type { HasId } from "@/shared/types/props";
import type { Page } from "@/shared/models/entities";
import type { UserDto } from "@/features/users/models/dtos";

export type PostPreviewDto = HasId & {
    author: UserDto;
    createdAt: string;
    excerpt: string;
    slug: string;
    title: string;
    updatedAt: string;
};

export type PostDetailsDto = HasId & PostPreviewDto & {
    body: string;
};

export type CreatePostDto = Pick<PostDetailsDto, "title" | "body"> & {
    spaceId: number;
    userId: number;
};

export type UpdatePostDto = Partial<Pick<PostDetailsDto, "title" | "body">>;

export type PostsPage = Page<PostPreviewDto[]>;
