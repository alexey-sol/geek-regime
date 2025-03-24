import { type User } from "@/features/users/models/entities";

export type AuthorInfoProps = {
    author?: User;
    createdAt: string;
    formattedCreatedAt: string;
};
