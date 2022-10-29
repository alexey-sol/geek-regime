import { Gender } from "@/features/users/types";
import { HasId } from "@/shared/types/models";

export type UserDetailsDto = {
    name: string;
    image: null;
    gender?: Gender;
};

export type UserDto = HasId & {
    createdAt: string;
    details?: UserDetailsDto;
    email: string;
    updatedAt: string;
};
