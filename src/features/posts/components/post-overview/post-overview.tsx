import React from "react";
import { Link } from "react-router-dom";

import { path } from "@/shared/const";
import type { Post } from "@/features/posts/models/entities";

import {
    BodyStyled,
    InfoContainerStyled,
    PostOverviewStyled,
    TwoLineTextStyled,
} from "./style";
import { OverviewTitle } from "./overview-title";
import { OverviewExcerpt } from "./overview-excerpt";

export type PostOverviewProps = {
    post: Post;
};

export const PostOverview = ({ post }: PostOverviewProps) => {
    const postInfo = `${post.author.details.name} – ${post.formattedCreatedAt}`;

    return (
        <PostOverviewStyled>
            <Link to={`/${path.POSTS}/${post.slug}`}>
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
