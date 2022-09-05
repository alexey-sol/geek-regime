import React, { useMemo } from "react";
import { useAppSelector } from "@/app/hooks";
import { selectPostsPaging } from "@/features/posts/slice/selectors";
import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { PostOverview } from "@/features/posts/components/post-overview/post-overview";
import { Container, List } from "./post-list.style";

export const PostList = () => {
    const paging = useAppSelector(selectPostsPaging);
    const { data, isLoading } = useGetAllPostsQuery(paging);

    const postDtoList = useMemo(() => data?.items ?? {}, [data?.items]);
    const postOverviewElems = Object.values(postDtoList)
        .map((dto) => (
            <li key={dto.id}>
                <PostOverview postDto={dto} />
            </li>
        ));

    return (
        <Container>
            <List>
                {isLoading
                    ? "loading..."
                    : postOverviewElems}
            </List>
        </Container>
    );
};
