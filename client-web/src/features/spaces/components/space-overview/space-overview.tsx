import React, { type FC, type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { EditIcon } from "@eggziom/geek-regime-js-ui-kit/components/icon";
import { Skeleton } from "@eggziom/geek-regime-js-ui-kit/components/loaders";
import { Tooltip } from "@eggziom/geek-regime-js-ui-kit/components/tooltip";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { Link } from "react-router-dom";

import {
    HeaderStyled, NonOfficialIconWrap, SpaceOverviewStyled,
} from "./style";

import { createAbsoluteSpacePostsPath } from "@/features/spaces/utils/helpers";
import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { isStubItem } from "@/shared/utils/helpers/object";
import { type Space } from "@/features/spaces/models/entities";
import { OverviewTitle } from "@/shared/components/typography";

export const SpaceOverview: FC<PropsWithChildren<HasItem<MaybeStubItem<Space>>>> = ({
    children,
    item,
}) => {
    const { t } = useTranslation();
    const isLoading = isStubItem(item);

    return (
        <Skeleton isLoading={isLoading} heightPx={66}>
            <Link to={createAbsoluteSpacePostsPath(item.slug ?? "")}>
                <SpaceOverviewStyled color={item.isOfficial ? "secondary" : "primary"}>
                    {!!item.title && (
                        <HeaderStyled>
                            <OverviewTitle as="p" title={item.title}>
                                {item.title}
                            </OverviewTitle>

                            {!item.isOfficial && (
                                <Tooltip message={t("spaces.item.header.nonOfficial.tooltip")}>
                                    <NonOfficialIconWrap onClick={(event) => event.preventDefault()}>
                                        <EditIcon color="primary" />
                                    </NonOfficialIconWrap>
                                </Tooltip>
                            )}
                        </HeaderStyled>
                    )}

                    {children}

                    <Typography fontSize="xs">
                        {`${t("spaces.item.footer.postCount.title")}: ${item.postCount}`}
                    </Typography>
                </SpaceOverviewStyled>
            </Link>
        </Skeleton>
    );
};
