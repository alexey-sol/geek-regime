import { Gender } from "@/features/users/types";

export type UserDetailsDto = {
    name?: string;
    image: null;
    gender?: Gender;
};

export type UserDto = {
    createdAt: string;
    details?: UserDetailsDto;
    email: string;
    id: number;
    updatedAt: string;
};
