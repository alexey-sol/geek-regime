import React from "react";
import { PostOverview } from "@/features/posts/components/post-overview";
import { usePostsPagingContext } from "@/features/posts/contexts/posts-paging";
import { ListStyled, PostListStyled } from "./style";

export const PostList = () => {
    const { items } = usePostsPagingContext();

    const postOverviewElems = items.map((post) => (
        <li key={post.id}>
            <PostOverview post={post} />
        </li>
    ));

    return (
        <PostListStyled>
            <ListStyled>
                {postOverviewElems}
            </ListStyled>
        </PostListStyled>
    );
};
