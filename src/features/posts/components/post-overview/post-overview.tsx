import React from "react";
import { PostDto } from "@/features/posts/models/dtos";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import { Typography } from "@/shared/components/typography";
import { PostOverviewStyled } from "./post-overview.style";

export type PostOverviewProps = {
    postDto: PostDto;
}

export const PostOverview = ({ postDto }: PostOverviewProps) => {
    const post = fromPostDtoToEntity(postDto);

    return (
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
};
