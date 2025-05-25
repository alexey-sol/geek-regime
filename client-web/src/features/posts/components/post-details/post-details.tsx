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
import { Skeleton } from "@/shared/components/loaders";
import { isStubItem } from "@/shared/utils/helpers/object";
import { type MaybeStubItem } from "@/shared/types";
import { SpaceList } from "@/features/spaces/components/space-list";

import { AuthorInfo } from "../user-info";

import {
    ContentStyled, ControlsWrap, InfoStyled, PostDetailsStyled,
} from "./style";
import { usePostDetails } from "./utils";

type PostDetailsProps = {
    post: MaybeStubItem<Details>;
};

export const PostDetails: FC<PostDetailsProps> = ({ post }) => {
    const { t } = useTranslation();
    const { profile } = useAuthContext();
    const { pending, removeButtonView, tryRemovePost } = usePostDetails();

    const updatePostPath = createAbsolutePostsPath(post.slug ?? "", paths.UPDATE);

    const hasUpdates = post.createdAt !== post.updatedAt;
    const isRateable = profile && profile.id !== post.author?.id;

    const isLoading = isStubItem(post);

    return (
        <PostDetailsStyled>
            <Skeleton isLoading={isLoading} heightPx={30} widthPx={210}>
                <AuthorInfo
                    author={post.author}
                    createdAt={post.createdAt ?? ""}
                    formattedCreatedAt={post.formattedCreatedAt ?? ""}
                />
            </Skeleton>

            <ContentStyled>
                <Skeleton isLoading={isLoading} heightPx={49}>
                    <Typography as="h2">{post.title}</Typography>
                </Skeleton>

                <Skeleton isLoading={isLoading} heightPx={200}>
                    <Typography dangerouslySetInnerHTML={createInnerHtml(post.body ?? "")} />
                </Skeleton>
            </ContentStyled>

            <Skeleton isLoading={isLoading} heightPx={22} widthPx={300}>
                {!!post.spaces?.length && (
                    <SpaceList spaces={post.spaces} />
                )}
            </Skeleton>

            <Divider />

            <Skeleton isLoading={isLoading} heightPx={38} widthPx={180}>
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
            </Skeleton>

            <Skeleton isLoading={isLoading} heightPx={17} widthPx={120}>
                {post.meta && (
                    <PostMeta meta={post.meta}>
                        {isRateable
                            ? <ItemRatingUpdatable meta={post.meta} />
                            : <ItemRatingReadonly meta={post.meta} />}
                    </PostMeta>
                )}
            </Skeleton>

            <Skeleton isLoading={isLoading} heightPx={19} widthPx={120}>
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
            </Skeleton>
        </PostDetailsStyled>
    );
};
