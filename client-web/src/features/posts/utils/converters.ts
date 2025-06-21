import { plainToClass } from "class-transformer";

import {
    ProfilePostComment, PostComment, PostCommentTree, PostDetails, PostPreview,
} from "@/features/posts/models/entities";
import {
    type PostCommentResponse,
    type PostCommentTreeResponse,
    type PostDetailsResponse,
    type PostPreviewResponse,
} from "@/features/posts/models/dtos";

export const toPostDetails = (response: PostDetailsResponse): PostDetails =>
    plainToClass(PostDetails, response);

export const toPostPreview = (response: PostPreviewResponse): PostPreview =>
    plainToClass(PostPreview, response);

export const toPostPreviewList = (list: PostPreviewResponse[]): PostPreview[] =>
    list.map((response) => toPostPreview(response));

export const toPostComment = (response: PostCommentResponse): PostComment =>
    plainToClass(PostComment, response);

export const toProfilePostComment = (
    comment: PostCommentResponse,
    post: PostPreviewResponse,
): ProfilePostComment => plainToClass(ProfilePostComment, {
    ...comment,
    post,
});

export const toProfilePostCommentList = (
    comments: PostCommentResponse[],
    posts: PostPreviewResponse[],
): ProfilePostComment[] =>
    comments.map((item) => {
        const post = posts.find(({ id }) => id === item.postId);

        return post && toProfilePostComment(item, post);
    })
        .filter((item): item is ProfilePostComment => !!item);

export const toPostCommentList = (list: PostCommentResponse[]): PostComment[] =>
    list.map((response) => toPostComment(response));

export const toPostCommentTree = (response: PostCommentTreeResponse): PostCommentTree =>
    plainToClass(PostCommentTree, response);
