import type { HasId } from "@/shared/types/models";

export type Gender = "FEMALE" | "MALE";

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
