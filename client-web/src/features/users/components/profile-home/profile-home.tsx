import React, { type FC } from "react";
import styled from "styled-components";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";
import { Gender } from "@eggziom/geek-regime-js-commons";

import type { HasUser } from "../../types";

const ProfileHomeStyled = styled.section`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
`;

const SectionStyled = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    row-gap: 1.5rem;
`;

const StatsRowStyled = styled.section`
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.3fr 0.7fr;
`;

const WrappableTypographyStyled = styled(Typography)`
    word-wrap: anywhere;
`;

export const ProfileHome: FC<HasUser> = ({ user }) => {
    const { t } = useTranslation();
    const { details, formattedCreatedAt, formattedLastSeenAt } = user;
    const { about, gender, image } = details;

    const mapGenderToTranslation: Record<Gender, string> = {
        FEMALE: t("users.user.gender.female"),
        MALE: t("users.user.gender.male"),
    };

    return (
        <ProfileHomeStyled>
            <SectionStyled>
                {about && (
                    <Typography>{about}</Typography>
                )}

                {gender && (
                    <StatsRowStyled>
                        <WrappableTypographyStyled as="h2" fontSize="md">
                            {t("users.profile.home.stats.gender.title")}
                        </WrappableTypographyStyled>

                        <WrappableTypographyStyled>
                            {mapGenderToTranslation[gender]}
                        </WrappableTypographyStyled>
                    </StatsRowStyled>
                )}

                <StatsRowStyled>
                    <WrappableTypographyStyled as="h2" fontSize="md">
                        {t("users.profile.home.stats.createdAt.title")}
                    </WrappableTypographyStyled>

                    <WrappableTypographyStyled>
                        {formattedCreatedAt}
                    </WrappableTypographyStyled>
                </StatsRowStyled>

                <StatsRowStyled>
                    <WrappableTypographyStyled as="h2" fontSize="md">
                        {t("users.profile.home.stats.lastSeenAt.title")}
                    </WrappableTypographyStyled>

                    <WrappableTypographyStyled>
                        {formattedLastSeenAt}
                    </WrappableTypographyStyled>
                </StatsRowStyled>
            </SectionStyled>

            <SectionStyled>
                image
            </SectionStyled>
        </ProfileHomeStyled>
    );
};
