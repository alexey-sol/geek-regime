import React from "react";
import { Typography } from "@/shared/components/typography";
import { Post } from "@/features/posts/models/entities";
import { PostOverviewStyled } from "./post-overview.style";

export type PostOverviewProps = {
    post: Post;
};

export const PostOverview = ({ post }: PostOverviewProps) => (
    <PostOverviewStyled>
        <section>
            <Typography as="h2">{post.title}</Typography>
            <Typography>{post.body}</Typography>
        </section>

        <section>
            <Typography>
                Created at:
                {post.getFormattedCreatedAt()}
            </Typography>
            <Typography>
                Updated at:
                {post.getFormattedUpdatedAt()}
            </Typography>
        </section>
    </PostOverviewStyled>
);
