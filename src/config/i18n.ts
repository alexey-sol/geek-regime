import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Language, NodeEnv } from "@/shared/const";
import { appConfig } from "@/config/app";
import {
    en as enSessionTranslations,
    ru as ruSessionTranslations,
} from "@/features/session/resources/translations";
import {
    en as enSharedTranslations,
    ru as ruSharedTranslations,
} from "@/shared/resources/translations";
import {
    en as enPostsTranslations,
    ru as ruPostsTranslations,
} from "@/features/posts/resources/translations";

const isProduction = appConfig.nodeEnv === NodeEnv.PRODUCTION;

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: !isProduction,
        fallbackLng: Language.EN,
        resources: {
            [Language.EN]: {
                translation: {
                    ...enSessionTranslations,
                    ...enSharedTranslations,
                    ...enPostsTranslations,
                },
            },
            [Language.RU]: {
                translation: {
                    ...ruSessionTranslations,
                    ...ruSharedTranslations,
                    ...ruPostsTranslations,
                },
            },
        },
    })
    .catch(console.error);
