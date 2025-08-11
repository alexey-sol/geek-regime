import React, { type FC } from "react";
import styled from "styled-components";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { useTranslation } from "react-i18next";

import { type HasUser } from "../../types";

import { useUserTranslation } from "@/features/users/utils/hooks/use-user-translation";
import { createInnerHtml } from "@/shared/utils/helpers/dom";

const ProfileHomeStyled = styled.section`
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 1.5rem;
    max-width: 50rem;
    word-break: break-word;
`;

export const ProfileHome: FC<HasUser> = ({ user }) => {
    const { t } = useTranslation();
    const { mapGenderToTranslation } = useUserTranslation();
    const { details, formattedCreatedAt, formattedLastSeenAt } = user;

    return (
        <ProfileHomeStyled>
            {details.about && (
                <>
                    <Typography as="h2" fontSize="md">
                        {t("users.profile.settings.profile.about.title")}
                    </Typography>

                    <Typography dangerouslySetInnerHTML={createInnerHtml(details.about)} />
                </>
            )}

            {details.gender && (
                <>
                    <Typography as="h2" fontSize="md">
                        {t("users.profile.settings.profile.gender.title")}
                    </Typography>

                    <Typography>
                        {mapGenderToTranslation[details.gender]}
                    </Typography>
                </>
            )}

            {details.birthDate && (
                <>
                    <Typography as="h2" fontSize="md">
                        {t("users.profile.settings.profile.birthDate.title")}
                    </Typography>

                    <Typography>
                        {details.formattedBirthDate}
                    </Typography>
                </>
            )}

            <Typography as="h2" fontSize="md">
                {t("users.profile.settings.profile.createdAt.title")}
            </Typography>

            <Typography>
                {formattedCreatedAt}
            </Typography>

            <Typography as="h2" fontSize="md">
                {t("users.profile.settings.profile.lastSeenAt.title")}
            </Typography>

            <Typography>
                {formattedLastSeenAt}
            </Typography>
        </ProfileHomeStyled>
    );
};
