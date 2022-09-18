import { Page } from "@/shared/types/models";
import { UserDto } from "@/features/users/models/dtos";

export type PostDto = {
    author: UserDto;
    body: string;
    createdAt: string;
    id: number;
    slug: string;
    title: string;
    updatedAt: string;
};

export type PostsPage = Page<PostDto[]>;
