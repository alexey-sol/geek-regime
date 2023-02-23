import React, { type FC } from "react";
import differenceInMonths from "date-fns/differenceInMonths";
import { useTranslation } from "react-i18next";

import { LinkButton } from "@/shared/components/button";
import { Typography } from "@/shared/components/typography";
import { useLanguage } from "@/shared/utils/language";
import { paths } from "@/shared/const";
import type * as en from "@/features/posts/models/entities";

import { ContentStyled, InfoStyled, PostDetailsStyled } from "./style";

export type PostDetailsProps = {
    post: en.PostDetails;
};

export const PostDetails: FC<PostDetailsProps> = ({ post }) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const createdMonthsAgo = differenceInMonths(new Date(post.createdAt), new Date());
    const relativeTimeFormat = new Intl.RelativeTimeFormat(language);
    const createdMonthsAgoText = relativeTimeFormat.format(createdMonthsAgo, "months");

    const bodyHtml = { __html: post.body };
    const updatePostPath = `/${paths.POSTS}/${post.slug}/${paths.UPDATE}`;

    const hasUpdates = post.createdAt !== post.updatedAt;

    return (
        <PostDetailsStyled>
            <section>
                <Typography>{post.author.details.name}</Typography>
            </section>

            <ContentStyled>
                <Typography view="caption">{post.title}</Typography>
                <Typography dangerouslySetInnerHTML={bodyHtml} />
            </ContentStyled>

            <InfoStyled>
                <Typography view="hint">
                    {`${t("post.createdAt")} ${post.formattedCreatedAt} (${createdMonthsAgoText})`}
                </Typography>

                {hasUpdates && (
                    <Typography view="hint">
                        {`${t("post.updatedAt")} ${post.formattedUpdatedAt}`}
                    </Typography>
                )}
            </InfoStyled>

            <section>
                <LinkButton to={updatePostPath}>
                    {t("draft.controls.editPostButton.title")}
                </LinkButton>
            </section>
        </PostDetailsStyled>
    );
};
