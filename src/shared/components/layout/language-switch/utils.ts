import { Language } from "@/shared/const";

export const mapLanguageToTitle: Record<string, string> = {
    [Language.EN]: "English",
    [Language.RU]: "Русский",
};

export const getLanguageTitle = (language: string) => mapLanguageToTitle[language] ?? "";

export const getFilteredLanguages = (languageToExclude: string) => Object
    .keys(mapLanguageToTitle)
    .filter((lang) => lang !== languageToExclude);
