import React, { type FC } from "react";
import { useTranslation } from "react-i18next";

import { createAbsoluteSpacePostsPath, getSpaceTagColor } from "@/features/spaces/utils/helpers";
import { type HasItem, MaybeStubItem } from "@/shared/types";
import { Skeleton } from "@/shared/components/loaders";
import { isStubItem } from "@/shared/utils/helpers/object";
import { Space } from "@/features/spaces/models/entities";
import { OverviewExcerpt, OverviewTitle } from "@/shared/components/typography";

import {
    BodyStyled, LinkStyled, NoWrapTypography, SpaceOverviewStyled,
} from "./style";

export const SpaceOverview: FC<HasItem<MaybeStubItem<Space>>> = ({ item }) => {
    const { t } = useTranslation();
    const isLoading = isStubItem(item);

    return (
        <Skeleton isLoading={isLoading} heightPx={85}>
            <SpaceOverviewStyled color={getSpaceTagColor(item.isOfficial)}>
                <BodyStyled>
                    {!!item.title && (
                        <LinkStyled to={createAbsoluteSpacePostsPath(item.slug ?? "")}>
                            <OverviewTitle as="p" title={item.title}>{item.title}</OverviewTitle>

                            {!item.isOfficial && (
                                <NoWrapTypography fontSize="xs">
                                    {t("spaces.item.footer.nonOfficial.title")}
                                </NoWrapTypography>
                            )}
                        </LinkStyled>
                    )}

                    {!!item.description && (
                        <OverviewExcerpt fontSize="xs">{item.description}</OverviewExcerpt>
                    )}
                </BodyStyled>
            </SpaceOverviewStyled>
        </Skeleton>
    );
};
