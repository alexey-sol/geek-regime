import React, { type FC } from "react";

import { Divider } from "@/shared/components/divider";
import { usePostsPage } from "@/features/posts/utils/hooks/use-posts-page";

import { PostOverview } from "../post-overview";

import { ListItemStyled, ListStyled, PostListStyled } from "./style";

export const PostList: FC = () => {
    const { posts } = usePostsPage();

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
