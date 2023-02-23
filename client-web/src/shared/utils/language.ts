import { useTranslation } from "react-i18next";
import i18next from "i18next";

export const getLanguage = (): string => i18next.language;

export type UseLanguageResult = {
    language: string;
    setLanguage: (lang: string) => ReturnType<typeof i18next.changeLanguage>;
};

export const useLanguage = (): UseLanguageResult => {
    const { i18n } = useTranslation();

    const language = getLanguage();
    const setLanguage = (lang: string) => i18n.changeLanguage(lang);

    return { language, setLanguage };
};
