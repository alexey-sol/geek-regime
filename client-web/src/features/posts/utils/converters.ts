import { plainToClass } from "class-transformer";

import { PostDetails, PostPreview } from "@/features/posts/models/entities";
import type { PageDto } from "@/shared/models/dtos";
import type { PostDetailsDto, PostPreviewDto, PostsPage } from "@/features/posts/models/dtos";

export const fromPageDtoToPostsPage = (response: PageDto<PostPreviewDto[]>): PostsPage => ({
    items: response.content,
    options: {
        size: response.size,
        totalItems: response.totalElements,
    },
});

export const fromPostDetailsDtoToEntity = (dto: PostDetailsDto): PostDetails =>
    plainToClass(PostDetails, dto);

export const fromPostPreviewDtoToEntity = (dto: PostPreviewDto): PostPreview =>
    plainToClass(PostPreview, dto);

export const fromPostPreviewDtoListToEntities = (dtoList: PostPreviewDto[]): PostPreview[] =>
    dtoList.map((dto) => fromPostPreviewDtoToEntity(dto));
