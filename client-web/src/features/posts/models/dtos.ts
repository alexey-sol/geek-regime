import type { HasId } from "@eggziom/geek-regime-js-commons";
import type { components } from "@eggziom/geek-regime-js-commons/dist/models/schemas-v1";

import type { Page } from "@/shared/models/entities";

export type PostPreviewDto = components["schemas"]["UserPostPreviewResponse"];

export type PostDetailsDto = HasId & PostPreviewDto & {
    body: string;
};

export type CreatePostDto = Pick<PostDetailsDto, "title" | "body"> & {
    authorId: number;
    spaceId: number;
};

export type UpdatePostDto = Partial<Pick<PostDetailsDto, "title" | "body">>;

export type PostsPage = Page<PostPreviewDto[]>;
