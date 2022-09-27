import React from "react";
import { PostList } from "@/features/posts/components/post-list";
import { Paging } from "@/shared/components/paging";
import styled from "styled-components";
import { PostsPagingProvider, usePostsPagingContext } from "@/features/posts/contexts/posts-paging";

const pathPrefix = "/posts";

export const PostListViewStyled = styled.section`
    display: flex;
    box-sizing: border-box;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

export const PostListView = () => {
    const { isLoading, options, setPage } = usePostsPagingContext();
    const { page, size, totalItems } = options;

    return (
        <PostListViewStyled>
            {isLoading
                ? "loading..."
                : <PostList />}

            <Paging
                page={page}
                pathPrefix={pathPrefix}
                qs=""
                setPage={setPage}
                size={size}
                totalItems={totalItems}
            />
        </PostListViewStyled>
    );
};

export default () => (
    <PostsPagingProvider>
        <PostListView />
    </PostsPagingProvider>
);
