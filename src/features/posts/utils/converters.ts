import { Post, PostsPage } from "@/features/posts/types/models";
import { PageDto } from "@/shared/types/models";
import { getMapIdToEntity } from "@/shared/utils/converters/get-map-id-to-entity";

export const fromPageDtoToPostsPage = (response: PageDto<Post[]>): PostsPage => ({
    items: getMapIdToEntity(response.content),
    options: {
        size: response.size,
        totalPages: response.totalPages,
        totalSize: response.totalElements,
    },
});
