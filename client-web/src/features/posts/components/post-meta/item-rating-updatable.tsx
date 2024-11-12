import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { Tooltip } from "@/shared/components/tooltip";
import { DislikeIconButton, LikeIconButton } from "@/shared/components/icon-button";
import { type PostMeta as Meta } from "@/features/posts/models/entities";

import { getCappedCountLabel, getRatingColor } from "./utils";
import { MetaItemStyled } from "./style";

type ItemRatingUpdatableProps = {
    meta: Meta;
    onDislike: () => void;
    onLike: () => void;
    userVoteValue?: number;
};

export const ItemRatingUpdatable: FC<ItemRatingUpdatableProps> = ({
    meta,
    onDislike,
    onLike,
    userVoteValue = 0,
}) => {
    const { t } = useTranslation();
    const ratingColor = getRatingColor(meta.rating);

    return (
        <MetaItemStyled>
            <DislikeIconButton
                color={userVoteValue < 0 ? "secondary" : undefined}
                title={userVoteValue < 0
                    ? t("posts.post.dislikeButton.active.tooltip")
                    : t("posts.post.dislikeButton.inactive.tooltip")}
                onClick={onDislike}
            />

            <Tooltip message={`${t("posts.post.rating")}: ${meta.rating}`}>
                <Typography color={ratingColor} fontSize="sm" weight='bolder'>
                    {getCappedCountLabel(meta.rating)}
                </Typography>
            </Tooltip>

            <LikeIconButton
                color={userVoteValue > 0 ? "secondary" : undefined}
                title={userVoteValue > 0
                    ? t("posts.post.likeButton.active.tooltip")
                    : t("posts.post.likeButton.inactive.tooltip")}
                onClick={onLike}
            />
        </MetaItemStyled>
    );
};
