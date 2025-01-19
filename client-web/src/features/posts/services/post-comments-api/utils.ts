import { getApiPath } from "@/shared/utils/formatters/api-path";
import { type PostDetailsResponse } from "@/features/posts/models/dtos";

import * as cn from "./const";

const API_VERSION = 1;

export const baseUrl = getApiPath(API_VERSION);

export const createTag = (id: string | number): {
    id: string | number;
    type: typeof cn.POST_COMMENTS_TYPE;
} => ({
    id,
    type: cn.POST_COMMENTS_TYPE,
});

export const decrementPostCommentCount = (post: PostDetailsResponse): void => {
    if (post.meta) {
        post.meta.commentCount -= 1;
    }
};

export const incrementPostCommentCount = (post: PostDetailsResponse): void => {
    if (post.meta) {
        post.meta.commentCount += 1;
    }
};
