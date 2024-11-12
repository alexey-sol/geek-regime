import React, { type FC, useCallback } from "react";
import differenceInMonths from "date-fns/differenceInMonths";
import { useTranslation } from "react-i18next";
import { Link, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { useLanguage } from "@/shared/utils/language";
import { paths } from "@/shared/const";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import {
    ItemRatingReadonly,
    ItemRatingUpdatable,
    PostMeta,
} from "@/features/posts/components/post-meta";
import { useAuthContext } from "@/features/auth/contexts/auth";
import type * as en from "@/features/posts/models/entities";

import { ContentStyled, InfoStyled, PostDetailsStyled } from "./style";

export type PostDetailsProps = {
    post: en.UserPostDetails;
};

export const PostDetails: FC<PostDetailsProps> = ({ post }) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const { profile } = useAuthContext();

    const createdMonthsAgo = differenceInMonths(new Date(post.createdAt), new Date());
    const relativeTimeFormat = new Intl.RelativeTimeFormat(language);
    const createdMonthsAgoText = relativeTimeFormat.format(createdMonthsAgo, "months");

    const bodyHtml = { __html: post.body };
    const updatePostPath = createAbsolutePostsPath(post.slug, paths.UPDATE);

    const hasUpdates = post.createdAt !== post.updatedAt;
    const isRateable = profile && profile.id !== post.author.id;
    const userVoteValue = 0; // TODO stub

    const handleDislike = useCallback(() => {}, []); // TODO stub
    const handleLike = useCallback(() => {}, []);

    return (
        <PostDetailsStyled>
            <section>
                <Typography>{post.author.details.name}</Typography>
            </section>

            <ContentStyled>
                <Typography as="h2">{post.title}</Typography>
                <Typography dangerouslySetInnerHTML={bodyHtml} />
            </ContentStyled>

            <InfoStyled>
                <Typography color="greyDarken" fontSize="sm">
                    {`${t("posts.post.createdAt")}: ${post.formattedCreatedAt}`
                        + ` (${createdMonthsAgoText})`}
                </Typography>

                {hasUpdates && (
                    <Typography color="greyDarken" fontSize="sm">
                        {`${t("posts.post.updatedAt")}: ${post.formattedUpdatedAt}`}
                    </Typography>
                )}
            </InfoStyled>

            <PostMeta meta={post.meta}>
                {isRateable
                    ? (
                        <ItemRatingUpdatable
                            meta={post.meta}
                            onDislike={handleDislike}
                            onLike={handleLike}
                            userVoteValue={userVoteValue}
                        />
                    )
                    : <ItemRatingReadonly meta={post.meta} />}
            </PostMeta>

            <section>
                <Link to={updatePostPath}>
                    {t("posts.draft.actions.editPostButton.title")}
                </Link>
            </section>
        </PostDetailsStyled>
    );
};
