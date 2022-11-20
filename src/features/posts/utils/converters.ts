import { plainToClass } from "class-transformer";

import { Post } from "@/features/posts/models/entities";
import type { PageDto } from "@/shared/types/models";
import type { PostDto, PostsPage } from "@/features/posts/models/dtos";

export const fromPageDtoToPostsPage = (response: PageDto<PostDto[]>): PostsPage => ({
    items: response.content,
    options: {
        size: response.size,
        totalItems: response.totalElements,
    },
});

export const fromPostDtoToEntity = (post: PostDto): Post => plainToClass(Post, post);
