import { type User } from "@/features/users/models/entities";

export type UserInfoProps = {
    author?: User;
    createdAt: string;
    formattedCreatedAt: string;
};
