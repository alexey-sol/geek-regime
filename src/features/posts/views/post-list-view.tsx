import React from "react";
import { PostList } from "@/features/posts/components/post-list";
import { Paging } from "@/shared/components/paging";
import styled from "styled-components";
import { PostsPagingProvider, usePostsPagingContext } from "@/features/posts/contexts/posts-paging";

const pathPrefix = "/posts";

export const PostListViewStyled = styled.section`
    display: flex;
    flex-direction: column;
`;

export const PostListView = () => {
    const { options, setPage } = usePostsPagingContext();
    const { page, size, totalSize } = options;

    return (
        <PostListViewStyled>
            <PostList />

            <Paging
                count={size}
                currentPage={page}
                pathPrefix={pathPrefix}
                qs=""
                setCurrentPage={setPage}
                totalRecords={totalSize}
            />
        </PostListViewStyled>
    );
};

export default () => (
    <PostsPagingProvider>
        <PostListView />
    </PostsPagingProvider>
);
