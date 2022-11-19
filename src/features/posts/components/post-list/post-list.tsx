import React from "react";

import { PostOverview } from "@/features/posts/components/post-overview";
import { usePostsPagingContext } from "@/features/posts/contexts/posts-paging";
import { Divider } from "@/shared/components/divider";

import { ListItemStyled, ListStyled, PostListStyled } from "./style";

export const PostList = () => {
    const { items } = usePostsPagingContext();

    const postOverviewElements = items.map((post, index) => (
        <ListItemStyled key={post.id}>
            {index > 0 && <Divider />}
            <PostOverview post={post} />
        </ListItemStyled>
    ));

    return (
        <PostListStyled>
            <ListStyled>
                {postOverviewElements}
            </ListStyled>
        </PostListStyled>
    );
};
