import React from "react";
import { PostDetails } from "@/features/posts/components/post-details";
import { useGetPostBySlugQuery } from "@/features/posts/services/api";
import { useParams } from "react-router";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import { useAppSelector } from "@/app/hooks";

export const PostDetailsView = () => {
    const params = useParams();
    const { data, isLoading } = useGetPostBySlugQuery(params.slug ?? "");

    if (!params.slug || !data) {
        return null; // TODO 404
    }

    const post = fromPostDtoToEntity(data);

    return (
        <section>
            {isLoading
                ? "loading..."
                : <PostDetails post={post} />}
        </section>
    );
};

export default PostDetailsView;
