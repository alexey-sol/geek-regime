import React from "react";
import { Link } from "react-router-dom";

import { Post } from "@/features/posts/models/entities";
import { path } from "@/shared/const";

import {
    BodyStyled,
    InfoContainerStyled,
    PostOverviewStyled,
    TwoLineTextStyled,
} from "./style";

export type PostOverviewProps = {
    post: Post;
};

export const PostOverview = ({ post }: PostOverviewProps) => {
    const postInfo = `${post.author.details.name} – ${post.formattedCreatedAt}`;

    return (
        <PostOverviewStyled>
            <Link to={`/${path.POSTS}/${post.slug}`}>
                <BodyStyled>
                    <TwoLineTextStyled
                        title={post.title}
                        variation="caption"
                    >
                        {post.title}
                    </TwoLineTextStyled>

                    <TwoLineTextStyled>{post.excerpt}</TwoLineTextStyled>
                </BodyStyled>
            </Link>

            <InfoContainerStyled>
                <TwoLineTextStyled>{postInfo}</TwoLineTextStyled>
            </InfoContainerStyled>
        </PostOverviewStyled>
    );
};
