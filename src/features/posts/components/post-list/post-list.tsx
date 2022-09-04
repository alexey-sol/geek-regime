import React from "react";
import { useAppSelector } from "@/app/hooks";
import { selectPostsPaging } from "@/features/posts/slice/selectors";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import styled from "styled-components";

const ContainerStyled = styled.div`
    background-color: coral;
`;

export const PostList = () => {
    const paging = useAppSelector(selectPostsPaging);
    const { data, isLoading } = useGetAllPostsQuery(paging);
    const posts = data?.items ?? {};

    return (
        <ContainerStyled>
            Post List
        </ContainerStyled>
    );
};
