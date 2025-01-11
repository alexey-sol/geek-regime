import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { paths } from "@/shared/const";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import {
    ItemRatingReadonly,
    ItemRatingUpdatable,
    PostMeta,
} from "@/features/posts/components/post-meta";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { Divider } from "@/shared/components/divider";
import { createInnerHtml } from "@/shared/utils/helpers/dom";

import { ContentStyled, InfoStyled, PostDetailsStyled } from "./style";

export const PostDetails: FC = () => {
    const { t } = useTranslation();
    const { post } = useActivePost();
    const { profile } = useAuthContext();

    if (!post) {
        return null;
    }

    const updatePostPath = createAbsolutePostsPath(post.slug, paths.UPDATE);

    const hasUpdates = post.createdAt !== post.updatedAt;
    const isRateable = profile && profile.id !== post.author.id;

    return (
        <PostDetailsStyled>
            <section>
                <Typography>{post.author.details.name}</Typography>
            </section>

            <ContentStyled>
                <Typography as="h2">{post.title}</Typography>
                <Typography dangerouslySetInnerHTML={createInnerHtml(post.body)} />
            </ContentStyled>

            <Divider />

            <InfoStyled>
                <Typography color="greyDarken" fontSize="sm">
                    {`${t("posts.post.createdAt")}: ${post.formattedCreatedAt}`}
                </Typography>

                {hasUpdates && (
                    <Typography color="greyDarken" fontSize="sm">
                        {`${t("posts.post.updatedAt")}: ${post.formattedUpdatedAt}`}
                    </Typography>
                )}
            </InfoStyled>

            <PostMeta meta={post.meta}>
                {isRateable
                    ? <ItemRatingUpdatable meta={post.meta} />
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
