import { plainToClass } from "class-transformer";

import { UserPostDetails, UserPostPreview } from "@/features/posts/models/entities";
import type {
    PostDetailsResponse, PostPreviewResponse,
} from "@/features/posts/models/dtos";

export const toUserPostDetails = (response: PostDetailsResponse): UserPostDetails =>
    plainToClass(UserPostDetails, response);

export const toUserPostPreview = (response: PostPreviewResponse): UserPostPreview =>
    plainToClass(UserPostPreview, response);

export const toUserPostPreviewList = (list: PostPreviewResponse[]): UserPostPreview[] =>
    list.map((response) => toUserPostPreview(response));
