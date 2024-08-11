import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { Divider } from "@/shared/components/divider";
import { UserPostPreview } from "@/features/posts/models/entities";

import { PostOverview } from "../post-overview";

import { ListItemStyled, ListStyled, PostListStyled } from "./style";

type PostListProps = {
    posts: UserPostPreview[];
};

export const PostList: FC<PostListProps> = ({ posts }) => {
    const { t } = useTranslation();

    const postOverviewList = (
        <ListStyled>
            {posts.map((post, index) => (
                <ListItemStyled key={post.id}>
                    {index > 0 && <Divider />}
                    <PostOverview post={post} />
                </ListItemStyled>
            ))}
        </ListStyled>
    );

    const stub = (
        <Typography>
            {t("shared.paging.content.empty")}
        </Typography>
    );

    return (
        <PostListStyled>
            {posts.length > 0 ? postOverviewList : stub}
        </PostListStyled>
    );
};
