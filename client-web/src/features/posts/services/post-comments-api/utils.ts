import { type HasId } from "@eggziom/geek-regime-js-utils";

import * as cn from "./const";
import type * as tp from "./types";

import {
    type PostCommentPageResponse,
    type PostCommentResponse,
    type PostDetailsResponse,
} from "@/features/posts/models/dtos";

export const createTag = (id: string | number): {
    id: string | number;
    type: typeof cn.POST_COMMENTS_TYPE;
} => ({
    id,
    type: cn.POST_COMMENTS_TYPE,
});

// Invalidate only descendant comments (which are replies to another comments, since root
// comments will be updated manually) or comments from the user profile section.
export const invalidateReplyOrProfileComments = <R>(
    resultList: R | undefined,
    error: unknown,
    arg: { meta: Partial<tp.HasRootCommentId> },
): Array<ReturnType<typeof createTag>> => ((resultList && arg.meta.rootCommentId)
        // There's no rootCommentId only when creating a root comment (i.e. commenting the post).
        ? [createTag(arg.meta.rootCommentId), createTag(cn.PROFILE_COMMENTS_ID)]
        : [createTag(cn.PROFILE_COMMENTS_ID)]);

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
