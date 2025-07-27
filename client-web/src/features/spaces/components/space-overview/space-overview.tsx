import React, { type FC, type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import {
    EditIcon, Skeleton, Tooltip, Typography,
} from "@eggziom/geek-regime-js-ui-kit";
import { Link } from "react-router-dom";

import { createAbsoluteSpacePostsPath } from "@/features/spaces/utils/helpers";
import { type HasItem, MaybeStubItem } from "@/shared/types";
import { isStubItem } from "@/shared/utils/helpers/object";
import { Space } from "@/features/spaces/models/entities";
import { OverviewTitle } from "@/shared/components/typography";

import {
    HeaderStyled, NonOfficialIconWrap, SpaceOverviewStyled,
} from "./style";

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
