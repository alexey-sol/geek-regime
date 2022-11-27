import React, { memo } from "react";
import styled from "styled-components";

import { PostList } from "@/features/posts/components/post-list";
import { Paging } from "@/shared/components/paging";
import { path } from "@/shared/const";
import { usePostsPage } from "@/features/posts/utils/hooks/use-posts-page";

export const PostListViewStyled = styled.section`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

export const InnerStyled = styled.section`
    padding-bottom: ${({ theme }) => theme.components.main.paddingY};
`;

export const PostListView = () => {
    const { isPending, pagingOptions } = usePostsPage();
    const { page, size, totalItems } = pagingOptions;

    return (
        <PostListViewStyled>
            <InnerStyled>
                {isPending && "loading"}
                <PostList />
            </InnerStyled>

            <Paging
                page={page}
                pathPrefix={`/${path.POSTS}`}
                qs=""
                size={size}
                totalItems={totalItems}
            />
        </PostListViewStyled>
    );
};

// eslint-disable-next-line import/no-default-export
export default memo(() => <PostListView />);
