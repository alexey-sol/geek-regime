import React from "react";
import { Post } from "@/features/posts/models/entities";
import { Link } from "react-router-dom";
import { path } from "@/shared/const";
import {
    BodyStyled,
    ExcerptStyled,
    InfoContainerStyled,
    OneLineTextStyled,
    PostOverviewStyled,
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
                    <OneLineTextStyled
                        title={post.title}
                        variation="caption"
                    >
                        {post.title}
                    </OneLineTextStyled>

                    <ExcerptStyled>{post.excerpt}</ExcerptStyled>
                </BodyStyled>
            </Link>

            <InfoContainerStyled>
                <OneLineTextStyled>{postInfo}</OneLineTextStyled>
            </InfoContainerStyled>
        </PostOverviewStyled>
    );
};
