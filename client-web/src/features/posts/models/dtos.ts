import type { HasId } from "js-commons/src/types/props";
import type { UserDto } from "js-commons/src/types/users";

import type { Page } from "@/shared/models/entities";

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
