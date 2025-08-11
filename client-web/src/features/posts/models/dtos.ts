import type { components as post } from "@eggziom/geek-regime-js-utils/models/post-schemas-v1";
import type { components as postComment } from "@eggziom/geek-regime-js-utils/models/post-comment-schemas-v1";

export type PostPreviewResponse = post["schemas"]["PostPreviewResponse"];

export type PostDetailsResponse = post["schemas"]["PostDetailsResponse"];

export type CreatePostRequest = post["schemas"]["CreatePostRequest"];

export type UpdatePostRequest = post["schemas"]["UpdatePostRequest"];

export type PostPreviewPageResponse = post["schemas"]["PostPreviewPageResponse"];

export type PostCommentPageResponse = postComment["schemas"]["PostCommentPageResponse"];

export type PostCommentResponse = postComment["schemas"]["PostCommentResponse"];

export type PostCommentTreeResponse = postComment["schemas"]["PostCommentTreeResponse"];

export type CreatePostCommentRequest = postComment["schemas"]["CreatePostCommentRequest"];

export type UpdatePostCommentRequest = postComment["schemas"]["UpdatePostCommentRequest"];
