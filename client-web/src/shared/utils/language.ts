import { useTranslation } from "react-i18next";
import i18next from "i18next";

export const getLanguage = () => i18next.language;

export const useLanguage = () => {
    const { i18n } = useTranslation();

    const language = getLanguage();
    const setLanguage = (lang: string) => i18n.changeLanguage(lang);

    return { language, setLanguage };
};
