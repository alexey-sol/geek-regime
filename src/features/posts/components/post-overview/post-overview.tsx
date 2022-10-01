import React from "react";
import { Typography } from "@/shared/components/typography";
import { Post } from "@/features/posts/models/entities";
import { Link } from "react-router-dom";
import { path } from "@/shared/const";
import { PostOverviewStyled } from "./post-overview.style";

export type PostOverviewProps = {
    post: Post;
};

export const PostOverview = ({ post }: PostOverviewProps) => (
    <PostOverviewStyled>
        <Link to={`/${path.POSTS}/${post.slug}`}>
            <section>
                <Typography as="h2">{post.title}</Typography>
                <Typography>{post.body}</Typography>
            </section>
        </Link>

        <section>
            <Typography i18nKey="post.createdAt" />
            <Typography>{post.getFormattedCreatedAt()}</Typography>

            <Typography i18nKey="post.updatedAt" />
            <Typography>{post.getFormattedUpdatedAt()}</Typography>
        </section>
    </PostOverviewStyled>
);
