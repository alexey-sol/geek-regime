import { Post, PostsPage } from "@/features/posts/types/models";
import { PageDto } from "@/shared/types/models";

export const fromPageDtoToPostsPage = (response: PageDto<Post[]>): PostsPage => ({
    items: response.content.reduce((posts, post) => {
        posts[post.id] = post;
        return posts;
    }, {} as Record<number, Post>), // TODO fix casting?
    options: {
        size: response.size,
        totalPages: response.totalPages,
        totalSize: response.totalElements,
    },
});
