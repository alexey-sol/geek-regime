import type { HasId } from "./props";

export type Gender = "FEMALE" | "MALE";

export type UserDetailsDto = {
    name: string;
    image?: string;
    gender?: Gender;
};

export type UserDto = HasId & {
    createdAt: string;
    details?: UserDetailsDto;
    email: string;
    updatedAt: string;
};

export type CreateUserDetailsDto = {
    name: string;
    image?: string;
    gender?: Gender;
};

export type CreateUserDto = {
    email: string;
    password?: string;
    details: CreateUserDetailsDto;
};

export type UpdateUserDetailsDto = Partial<CreateUserDetailsDto>;

export type UpdateUserDto = Partial<Pick<CreateUserDto, "email">>
    & Omit<CreateUserDto, "details">
    & {
        oldPassword?: string;
        newPassword?: string;
        details: UpdateUserDetailsDto;
    };
