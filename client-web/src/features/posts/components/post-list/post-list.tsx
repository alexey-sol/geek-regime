import React, { type FC } from "react";

import { Divider } from "@/shared/components/divider";
import { UserPostPreview } from "@/features/posts/models/entities";

import { PostOverview } from "../post-overview";

import { ListItemStyled, ListStyled, PostListStyled } from "./style";

type PostListProps = {
    posts: UserPostPreview[];
};

export const PostList: FC<PostListProps> = ({ posts }) => {
    const postOverviews = posts.map((post, index) => (
        <ListItemStyled key={post.id}>
            {index > 0 && <Divider />}
            <PostOverview post={post} />
        </ListItemStyled>
    ));

    return (
        <PostListStyled>
            <ListStyled>
                {postOverviews}
            </ListStyled>
        </PostListStyled>
    );
};
