import React from "react";
import { Typography } from "@/shared/components/typography";
import { Language } from "@/shared/const";
import { useLanguage } from "@/shared/utils/language";
import { HeaderInnerStyled, HeaderStyle } from "./header.style";

const mapLanguageToTitle: Record<string, string> = {
    [Language.EN]: "En",
    [Language.RU]: "Ru",
};

export const Header = () => {
    const { setLanguage } = useLanguage();

    return (
        <HeaderStyle>
            <HeaderInnerStyled>
                <Typography>Geek Regime</Typography>

                <section>
                    {Object.keys(mapLanguageToTitle).map((language) => (
                        <button
                            key={language}
                            type="submit"
                            onClick={() => setLanguage(language)}
                        >
                            <Typography>{mapLanguageToTitle[language]}</Typography>
                        </button>
                    ))}
                </section>
            </HeaderInnerStyled>
        </HeaderStyle>
    );
};
