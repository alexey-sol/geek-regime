import React, { type FC, useCallback, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetAllPostCommentsQuery } from "@/features/posts/services/post-comments-api";
import { defaults } from "@/shared/const";
import { normalizeGetAllPostCommentsArg } from "@/features/posts/utils/api";
import { useInfiniteScroll } from "@/shared/utils/hooks/use-infinite-scroll";
import { hasMore } from "@/shared/utils/api";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { type PostCommentResponse } from "@/features/posts/models/dtos";

const DEFAULT_POST_COMMENTS: PostCommentResponse[] = [];

export const PostComments: FC = () => {
    const [page, setPage] = useState(defaults.START_PAGE);

    const { post } = useActivePost();

    const arg = post && normalizeGetAllPostCommentsArg({
        postId: post.id,
        params: { page },
    });

    const result = useGetAllPostCommentsQuery(arg ?? skipToken);
    const { content = DEFAULT_POST_COMMENTS } = result.data ?? {};

    const onLoadMore = useCallback(() => {
        setPage(page + 1);
    }, [page]);

    const { scrollableRef } = useInfiniteScroll({
        hasMore: hasMore(result),
        onLoadMore,
    });

    return (
        <section ref={scrollableRef}>
            {content.map((comment) => (
                <section key={comment.id}>
                    {comment.body}
                </section>
            ))}
        </section>
    );
};
