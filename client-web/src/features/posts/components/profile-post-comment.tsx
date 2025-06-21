import React from "react";
import styled from "styled-components";
import { Link, Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { type ProfilePostComment as ProfilePostCommentEntity } from "@/features/posts/models/entities";
import { isStubItem } from "@/shared/utils/helpers/object";
import { usePrefetch } from "@/features/posts/services/posts-api";
import { Skeleton } from "@/shared/components/loaders";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";

import { CommentContent } from "./comment-content";

const ProfilePostCommentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const LinkStyled = styled(Link)`
    display: unset;
`;

export const ProfilePostComment = ({ item }: HasItem<MaybeStubItem<ProfilePostCommentEntity>>) => {
    const { t } = useTranslation();
    const prefetchPostBySlug = usePrefetch("getPostBySlug");

    const isLoading = isStubItem(item);

    return (
        <ProfilePostCommentStyled>
            <Skeleton heightPx={19} isLoading={isLoading}>
                {item.post && (
                    <Typography
                        as="span"
                        color="grey"
                        onMouseEnter={() => item.post && prefetchPostBySlug(item.post.slug)}
                    >
                        {t("posts.post.comments.item.post.title")}
                        &nbsp;
                        <LinkStyled to={createAbsolutePostsPath(item.post.slug)} view="secondary">
                            {item.post.title}
                        </LinkStyled>
                    </Typography>
                )}
            </Skeleton>
            <CommentContent isLoading={isLoading} item={item} />
        </ProfilePostCommentStyled>
    );
};
