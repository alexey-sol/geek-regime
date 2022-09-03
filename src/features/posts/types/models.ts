import { Page } from "@/shared/types/models";
import { User } from "@/features/users/types/models";

export type Post = {
    author: User;
    body: string;
    createdAt: string;
    id: number;
    slug: string;
    title: string;
    updatedAt: string;
}

export type PostsPage = Page<Record<number, Post>>
