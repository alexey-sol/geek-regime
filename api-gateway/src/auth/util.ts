import type { Profile } from "passport-yandex";

import type { CreateUserRequest, Gender } from "@/user/model/dto";

const convertGender = (gender?: string): Gender | undefined => {
    switch (gender?.toUpperCase()) {
        case "FEMALE":
            return "FEMALE";
        case "MALE":
            return "MALE";
        default:
            return undefined;
    }
};

export const fromYandexProfileToCreateUserDto = ({
    displayName,
    emails,
    gender,
    photos,
}: Profile): CreateUserRequest => {
    const email = emails?.[0]?.value ?? "";
    const defaultName = email.split("@")[0] ?? "";

    return {
        email: emails?.[0]?.value ?? "",
        details: {
            gender: convertGender(gender),
            image: photos?.[0]?.value,
            name: displayName ?? defaultName,
        },
    };
};
