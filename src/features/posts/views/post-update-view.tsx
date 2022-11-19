import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { useGetPostBySlugQuery } from "@/features/posts/services/api";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import { PostDraft } from "@/features/posts/components/post-draft";

export const PostUpdateViewStyled = styled.section`
    height: 100%;
`;

export const PostUpdateView = () => {
    const params = useParams();
    const { data, isLoading } = useGetPostBySlugQuery(params.slug ?? "");

    if (!params.slug || !data) {
        return null; // TODO 404
    }

    const post = data && fromPostDtoToEntity(data);

    return (
        <PostUpdateViewStyled>
            {isLoading
                ? "loading..."
                : <PostDraft post={post} />}
        </PostUpdateViewStyled>
    );
};

export default PostUpdateView;
