import React from "react";
import { useAppSelector } from "@/app/hooks";
import { selectPostsPaging } from "@/features/posts/slice/selectors";
import { useGetAllPostsQuery } from "@/features/posts/services/api";

export const PostList = () => {
    const paging = useAppSelector(selectPostsPaging);
    const postsResponse = useGetAllPostsQuery(paging);

    return (
        <div>
            Post List
        </div>
    );
};
