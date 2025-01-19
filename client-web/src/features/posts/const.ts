import { postCommentsApi } from "@/features/posts/services/post-comments-api";

export const CREATE_COMMENT_KEY = postCommentsApi.endpoints.createPostComment.name;

export const REMOVE_COMMENT_KEY = postCommentsApi.endpoints.removePostCommentById.name;

export const UPDATE_COMMENT_KEY = postCommentsApi.endpoints.updatePostCommentById.name;
