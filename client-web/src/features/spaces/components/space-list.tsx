import React, { type FC, useState } from "react";
import styled from "styled-components";
import { LinkButton } from "@eggziom/geek-regime-js-ui-kit";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { type Space } from "@/features/spaces/models/entities";
import { createAbsoluteSpacesPath } from "@/features/spaces/utils/helpers";
import { SpaceTag } from "@/features/spaces/components/tag";
import { Tag } from "@/shared/components/tag";

const MINIMIZED_LIST_LENGTH = 3;

const SpaceListStyled = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

type SpaceListProps = {
    spaces: Space[];
};

export const SpaceList: FC<SpaceListProps> = ({ spaces }) => {
    const { t } = useTranslation();
    const [showAll, setShowAll] = useState(false);

    const sortedSpaces = [...spaces];

    sortedSpaces.sort((a, b) => {
        if (a.isOfficial) {
            return -1;
        } else if (b.isOfficial) {
            return 1;
        }

        return 0;
    });

    const resultSpaces = showAll ? sortedSpaces : sortedSpaces.slice(0, MINIMIZED_LIST_LENGTH);

    return (
        <SpaceListStyled>
            {resultSpaces.map(({ isOfficial, slug, title }) => (
                <li key={slug}>
                    <Link to={createAbsoluteSpacesPath(slug)}>
                        <SpaceTag isOfficial={isOfficial}>{title}</SpaceTag>
                    </Link>
                </li>
            ))}

            {!showAll && sortedSpaces.length > MINIMIZED_LIST_LENGTH && (
                <li>
                    <LinkButton onClick={() => setShowAll(true)} view="plain">
                        <Tag color="greyLighten">{t("spaces.list.actions.showMoreButton.title")}</Tag>
                    </LinkButton>
                </li>
            )}

            {showAll && (
                <li>
                    <LinkButton onClick={() => setShowAll(false)} view="plain">
                        <Tag color="greyLighten">{t("spaces.list.actions.showLessButton.title")}</Tag>
                    </LinkButton>
                </li>
            )}
        </SpaceListStyled>
    );
};
