import React, { type FC } from "react";
import { Link } from "react-router-dom";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import type { PostPreview } from "@/features/posts/models/entities";

import {
    BodyStyled,
    InfoContainerStyled,
    PostOverviewStyled,
    TwoLineTextStyled,
} from "./style";
import { OverviewTitle } from "./overview-title";
import { OverviewExcerpt } from "./overview-excerpt";

export type PostOverviewProps = {
    post: PostPreview;
};

export const PostOverview: FC<PostOverviewProps> = ({ post }) => {
    const postInfo = `${post.author.details.name} – ${post.formattedCreatedAt}`;

    return (
        <PostOverviewStyled>
            <Link to={createAbsolutePostsPath(post.slug)}>
                <BodyStyled>
                    <OverviewTitle title={post.title} />
                    <OverviewExcerpt excerpt={post.excerpt} />
                </BodyStyled>
            </Link>

            <InfoContainerStyled>
                <TwoLineTextStyled>{postInfo}</TwoLineTextStyled>
            </InfoContainerStyled>
        </PostOverviewStyled>
    );
};
