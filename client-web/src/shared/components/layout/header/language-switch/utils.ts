import { Language } from "@/shared/const";

const LANGUAGE_DELIMITER = "-";

export const mapLanguageToTitle: Record<string, string> = {
    [Language.EN]: "English",
    [Language.RU]: "Русский",
};

export const getLanguageTitle = (language: string): string => {
    const normLanguage = language?.toLowerCase().split(LANGUAGE_DELIMITER)[0];

    return mapLanguageToTitle[normLanguage] ?? "";
};

export const getFilteredLanguages = (languageToExclude: string): string[] => Object
    .keys(mapLanguageToTitle)
    .filter((lang) => lang !== languageToExclude);
