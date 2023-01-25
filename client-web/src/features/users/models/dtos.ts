import type { HasId } from "@/shared/types/props";

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

export type SignInDto = {
    email: string;
    password: string;
};

export type SignUpDto = SignInDto & {
    details: Required<Pick<UserDetailsDto, "name">>;
};
