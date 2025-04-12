import { useTranslation } from "react-i18next";

import { type Gender } from "../../models/dtos";

const MAP_GENDER_TO_TRANSLATION_KEY: Record<Gender, string> = {
    BLANK: "users.user.gender.blank",
    FEMALE: "users.user.gender.female",
    MALE: "users.user.gender.male",
};

type UseUserTranslationResult = {
    mapGenderToTranslation: Record<Gender, string>;
};

export const useUserTranslation = (): UseUserTranslationResult => {
    const { t } = useTranslation();

    const mapGenderToTranslation = Object.entries(MAP_GENDER_TO_TRANSLATION_KEY)
        .reduce((acc, currentValue) => ({
            ...acc,
            [currentValue[0]]: t(currentValue[1]),
        }), {} as Record<Gender, string>);

    return {
        mapGenderToTranslation,
    };
};
