import React, { type FC } from "react";
import { Link as RouterDomLink } from "react-router-dom";
import { Link } from "@eggziom/geek-regime-js-ui-kit";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import type { UserPostPreview } from "@/features/posts/models/entities";

import {
    BodyStyled,
    InfoContainerStyled,
    PostOverviewStyled,
    TwoLineTextStyled,
} from "./style";
import { OverviewTitle } from "./overview-title";
import { OverviewExcerpt } from "./overview-excerpt";

export type PostOverviewProps = {
    post: UserPostPreview;
};

export const PostOverview: FC<PostOverviewProps> = ({ post }) => (
    <PostOverviewStyled>
        <RouterDomLink to={createAbsolutePostsPath(post.slug)}>
            <BodyStyled>
                <OverviewTitle title={post.title} />
                <OverviewExcerpt excerpt={post.excerpt} />
            </BodyStyled>
        </RouterDomLink>

        <InfoContainerStyled>
            <TwoLineTextStyled>
                <Link to={createAbsoluteUsersPath(post.author.slug)}>
                    {post.author.details.name}
                </Link>
                {" "}
                &mdash;
                {" "}
                {post.formattedCreatedAt}
            </TwoLineTextStyled>
        </InfoContainerStyled>
    </PostOverviewStyled>
);
