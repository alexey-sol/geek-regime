import React from "react";
import { Typography } from "@/shared/components/typography";
import { Post } from "@/features/posts/models/entities";
import differenceInMonths from "date-fns/differenceInMonths";
import { useLanguage } from "@/shared/utils/language";
import { path } from "@/shared/const";
import { useTranslation } from "react-i18next";
import { LinkButton } from "@/shared/components/button";
import { ContentStyled, InfoStyled, PostDetailsStyled } from "./style";

export type PostDetailsProps = {
    post: Post;
};

export const PostDetails = ({ post }: PostDetailsProps) => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const createdMonthsAgo = differenceInMonths(new Date(post.createdAt), new Date());
    const relativeTimeFormat = new Intl.RelativeTimeFormat(language);
    const createdMonthsAgoText = relativeTimeFormat.format(createdMonthsAgo, "months");

    const bodyHtml = { __html: post.sanitizedBody };
    const updatePostPath = `/${path.POSTS}/${post.slug}/${path.UPDATE}`;

    const hasUpdates = post.createdAt !== post.updatedAt;

    return (
        <PostDetailsStyled>
            <section>
                <Typography>{post.author.details.name}</Typography>
            </section>

            <ContentStyled>
                <Typography variation="caption">{post.title}</Typography>
                <Typography dangerouslySetInnerHTML={bodyHtml} />
            </ContentStyled>

            <InfoStyled>
                <Typography variation="hint">
                    {`${t("post.createdAt")} ${post.formattedCreatedAt} (${createdMonthsAgoText})`}
                </Typography>

                {hasUpdates && (
                    <Typography variation="hint">
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
