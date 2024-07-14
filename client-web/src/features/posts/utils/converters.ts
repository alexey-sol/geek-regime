import { plainToClass } from "class-transformer";

import { UserPostDetails, UserPostPreview } from "@/features/posts/models/entities";
import type {
    UserPostDetailsResponse, UserPostPreviewResponse,
} from "@/features/posts/models/dtos";

export const toUserPostDetails = (response: UserPostDetailsResponse): UserPostDetails =>
    plainToClass(UserPostDetails, response);

export const toUserPostPreview = (response: UserPostPreviewResponse): UserPostPreview =>
    plainToClass(UserPostPreview, response);

export const toUserPostPreviewList = (list: UserPostPreviewResponse[]): UserPostPreview[] =>
    list.map((response) => toUserPostPreview(response));
