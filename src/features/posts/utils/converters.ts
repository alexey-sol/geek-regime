import { Post } from "@/features/posts/models/entities";
import { PageDto } from "@/shared/types/models";
import { getMapIdToEntity } from "@/shared/utils/converters/get-map-id-to-entity";
import { plainToClass } from "class-transformer";
import { PostDto, PostsPage } from "@/features/posts/models/dtos";

export const fromPageDtoToPostsPage = (response: PageDto<PostDto[]>): PostsPage => ({
    items: getMapIdToEntity(response.content),
    options: {
        size: response.size,
        totalPages: response.totalPages,
        totalSize: response.totalElements,
    },
});

export const fromPostDtoToEntity = (post: PostDto): Post => plainToClass(Post, post);
