import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { isProduction } from "@eggziom/geek-regime-js-commons";
import LanguageDetector from "i18next-browser-languagedetector";

import { Language } from "@/shared/const";
import { en as enAuth, ru as ruAuth } from "@/features/auth/resources/translations";
import { en as enShared, ru as ruShared } from "@/shared/resources/translations";
import { en as enPosts, ru as ruPosts } from "@/features/posts/resources/translations";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: !isProduction(process.env.NODE_ENV),
        fallbackLng: Language.EN,
        resources: {
            [Language.EN]: {
                translation: {
                    ...enAuth,
                    ...enShared,
                    ...enPosts,
                },
            },
            [Language.RU]: {
                translation: {
                    ...ruAuth,
                    ...ruShared,
                    ...ruPosts,
                },
            },
        },
    })
    .catch(console.error);
