import type { Profile } from "passport-yandex";
import type { Response } from "express";

import type { CreateUserRequest, Gender } from "@/user/model/dto";

import * as ct from "./const";

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

const getJwtMaxAge = (jwtExpiresIn?: string) => {
    const dayInMs = 24 * 60 * 60 * 1000;
    const isExpirationTimeInDays = jwtExpiresIn?.endsWith("d");

    if (jwtExpiresIn && isExpirationTimeInDays) {
        const days = parseInt(jwtExpiresIn, 10);
        return days * dayInMs;
    }

    return dayInMs;
};

export const setAuthCookie = (res: Response, accessToken: string, jwtExpiresIn?: string) => {
    res.cookie(ct.AUTH_TOKEN_KEY, accessToken, {
        httpOnly: true,
        maxAge: getJwtMaxAge(jwtExpiresIn),
        sameSite: "strict",
    });
};
