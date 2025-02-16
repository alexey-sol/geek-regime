import { type HasId } from "@eggziom/geek-regime-js-commons";

import {
    type PostCommentPageResponse,
    type PostCommentResponse,
    type PostDetailsResponse,
} from "@/features/posts/models/dtos";

import * as cn from "./const";
import type * as tp from "./types";

export const createTag = (id: string | number): {
    id: string | number;
    type: typeof cn.POST_COMMENTS_TYPE;
} => ({
    id,
    type: cn.POST_COMMENTS_TYPE,
});

// Invalidate only descendant comments (replies to another comments). Root comments will be
// updated manually.
export const invalidateReplyComments = <R>(
    resultList: R | undefined,
    error: unknown,
    arg: { meta: Partial<tp.HasRootCommentId> },
): Array<ReturnType<typeof createTag>> => ((resultList && arg.meta.rootCommentId)
        // There's no rootCommentId only when creating a root comment (i.e. commenting the post).
        ? [createTag(arg.meta.rootCommentId)]
        : []);

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

const findRootCommentIndexById = (page: PostCommentPageResponse, id: HasId["id"]) =>
    page.content.findIndex((comment) => comment.id === id);

const findRootCommentById = (page: PostCommentPageResponse, id: HasId["id"]) => {
    const itemIndex = findRootCommentIndexById(page, id);

    return (itemIndex >= 0)
        ? page.content[itemIndex]
        : undefined;
};

export const incrementRootCommentReplyCount = (
    page: PostCommentPageResponse,
    rootCommentId: HasId["id"],
): void => {
    const rootComment = findRootCommentById(page, rootCommentId);

    if (rootComment) {
        rootComment.descendantCount += 1;
    }
};

export const decrementRootCommentReplyCount = (
    page: PostCommentPageResponse,
    rootCommentId: HasId["id"],
): void => {
    const rootComment = findRootCommentById(page, rootCommentId);

    if (rootComment) {
        rootComment.descendantCount -= 1;
    }
};

export const patchRootCommentPage = (
    page: PostCommentPageResponse,
    postComment: PostCommentResponse,
): void => {
    page.content.unshift(postComment);
    page.totalElements += 1;

    const hasNextPage = page.content.length < page.totalElements;

    if (hasNextPage) {
        page.content.pop();
    }
};

export const patchRootComment = (
    page: PostCommentPageResponse,
    id: HasId["id"],
    postComment: PostCommentResponse,
): void => {
    const rootCommentIndex = findRootCommentIndexById(page, id);

    if (rootCommentIndex >= 0) {
        page.content[rootCommentIndex] = postComment;
    }
};

export const softRemoveRootComment = (
    page: PostCommentPageResponse,
    rootCommentId: HasId["id"],
): void => {
    const rootComment = findRootCommentById(page, rootCommentId);

    if (rootComment) {
        rootComment.body = undefined;
        rootComment.isDeleted = true;
    }
};

export const getAllRootPostCommentsArg = (postId: HasId["id"]): tp.GetAllPostCommentsArg => ({
    postId,
    params: {},
});
