import type { HasId, UserDto } from "@eggziom/geek-regime-js-commons";

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
    authorId: number;
    spaceId: number;
};

export type UpdatePostDto = Partial<Pick<PostDetailsDto, "title" | "body">>;

export type PostsPage = Page<PostPreviewDto[]>;
