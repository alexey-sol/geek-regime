import React, { type FC } from "react";
import {
    DislikeIconButton, LikeIconButton, Tooltip, Typography,
} from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/features/auth/contexts/auth";

import { useActivePost } from "../../utils/hooks/use-active-post";

import { getCappedCountLabel, getRatingColor } from "./utils";
import { MetaItemStyled } from "./style";
import { type HasPostMeta } from "./types";

const NEUTRAL_VOTE_VALUE = 0;
const DISLIKE_VALUE = -1;
const LIKE_VALUE = 1;

export const ItemRatingUpdatable: FC<HasPostMeta> = ({ meta }) => {
    const { t } = useTranslation();
    const ratingColor = getRatingColor(meta.rating);

    const { profile } = useAuthContext();
    const { pending, post, voteOnPost } = useActivePost();

    const dislikePost = () => voteOnPost(DISLIKE_VALUE);
    const likePost = () => voteOnPost(LIKE_VALUE);
    const undoVoteOnPost = () => voteOnPost(NEUTRAL_VOTE_VALUE);

    const {
        value: userVoteValue = NEUTRAL_VOTE_VALUE,
    } = post?.votes.find(({ userId }) => userId === profile?.id) ?? {};

    return (
        <MetaItemStyled>
            <DislikeIconButton
                color={userVoteValue < NEUTRAL_VOTE_VALUE ? "secondary" : undefined}
                disabled={pending === "vote"}
                title={userVoteValue < NEUTRAL_VOTE_VALUE
                    ? t("posts.post.dislikeButton.active.tooltip")
                    : t("posts.post.dislikeButton.inactive.tooltip")}
                onClick={userVoteValue < NEUTRAL_VOTE_VALUE ? undoVoteOnPost : dislikePost}
            />

            <Tooltip message={`${t("posts.post.rating")}: ${meta.localizedRatingNumber}`}>
                <Typography color={ratingColor} fontSize="sm" weight='bolder'>
                    {getCappedCountLabel(meta.rating)}
                </Typography>
            </Tooltip>

            <LikeIconButton
                color={userVoteValue > NEUTRAL_VOTE_VALUE ? "secondary" : undefined}
                disabled={pending === "vote"}
                title={userVoteValue > NEUTRAL_VOTE_VALUE
                    ? t("posts.post.likeButton.active.tooltip")
                    : t("posts.post.likeButton.inactive.tooltip")}
                onClick={userVoteValue > NEUTRAL_VOTE_VALUE ? undoVoteOnPost : likePost}
            />
        </MetaItemStyled>
    );
};
