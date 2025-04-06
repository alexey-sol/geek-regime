import { Gender } from "@eggziom/geek-regime-js-commons";
import { useTranslation } from "react-i18next";

type GenderOrDefault = Gender | "";

const MAP_GENDER_TO_TRANSLATION_KEY: Record<GenderOrDefault, string> = {
    "": "users.user.gender.notSpecified",
    FEMALE: "users.user.gender.female",
    MALE: "users.user.gender.male",
};

type UseUserTranslationResult = {
    mapGenderToTranslation: Record<GenderOrDefault, string>;
};

export const useUserTranslation = (): UseUserTranslationResult => {
    const { t } = useTranslation();

    const mapGenderToTranslation = Object.entries(MAP_GENDER_TO_TRANSLATION_KEY)
        .reduce((acc, currentValue) => ({
            ...acc,
            [currentValue[0]]: t(currentValue[1]),
        }), {} as Record<GenderOrDefault, string>);

    return {
        mapGenderToTranslation,
    };
};
