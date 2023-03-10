import type { Profile } from "passport-yandex";
import type { CreateUserDto, Gender } from "js-commons/src/types/users";

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
}: Profile): CreateUserDto => ({
    email: emails?.[0]?.value ?? "",
    details: {
        gender: convertGender(gender),
        image: photos?.[0]?.value,
        name: displayName ?? "",
    },
});
