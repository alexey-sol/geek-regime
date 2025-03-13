import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, LinkButton, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { paths } from "@/shared/const";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import {
    ItemRatingReadonly,
    ItemRatingUpdatable,
    PostMeta,
} from "@/features/posts/components/post-meta";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { Divider } from "@/shared/components/divider";
import { createInnerHtml } from "@/shared/utils/helpers/dom";
import { Tooltip } from "@/shared/components/tooltip";
import { type PostDetails as Details } from "@/features/posts/models/entities";

import { UserName } from "../user-info";

import {
    ContentStyled, ControlsWrap, InfoStyled, PostDetailsStyled, UserNameWrap,
} from "./style";
import { usePostDetails } from "./utils";

type PostDetailsProps = {
    post: Details;
};

export const PostDetails: FC<PostDetailsProps> = ({ post }) => {
    const { t } = useTranslation();
    const { profile } = useAuthContext();
    const { pending, removeButtonView, tryRemovePost } = usePostDetails();

    const updatePostPath = createAbsolutePostsPath(post.slug, paths.UPDATE);

    const hasUpdates = post.createdAt !== post.updatedAt;
    const isRateable = profile && profile.id !== post.author?.id;

    return (
        <PostDetailsStyled>
            <UserNameWrap>
                <UserName author={post.author} />
            </UserNameWrap>

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

            <ControlsWrap>
                <Link to={updatePostPath} view="secondary">
                    {t("posts.draft.actions.editPostButton.title")}
                </Link>

                <Tooltip message={t("shared.tooltips.tryAction")}>
                    <LinkButton
                        disabled={pending === "remove"}
                        onClick={tryRemovePost}
                        view={removeButtonView}
                    >
                        {t("posts.draft.actions.removePostButton.title")}
                    </LinkButton>
                </Tooltip>
            </ControlsWrap>
        </PostDetailsStyled>
    );
};
