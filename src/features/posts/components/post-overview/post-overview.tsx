import React from "react";
import { PostDto } from "@/features/posts/models/dtos";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import { Container } from "./post-overview.style";

export type PostOverviewProps = {
    postDto: PostDto;
}

export const PostOverview = ({ postDto }: PostOverviewProps) => {
    const post = fromPostDtoToEntity(postDto);

    return (
        <Container>
            <section>
                <h2>{post.title}</h2>
                <section>{post.body}</section>
            </section>

            <section>
                <p>
                    Created at:
                    {post.getFormattedCreatedAt()}
                </p>
                <p>
                    Updated at:
                    {post.getFormattedUpdatedAt()}
                </p>
            </section>
        </Container>
    );
};
