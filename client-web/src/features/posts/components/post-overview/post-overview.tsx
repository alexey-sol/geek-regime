import React, { type FC } from "react";
import { Link as RouterDomLink } from "react-router-dom";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { PostMeta } from "@/features/posts/components/post-meta";
import { UserInfo } from "@/features/posts/components/user-info";
import { type PostPreview } from "@/features/posts/models/entities";
import { type HasItem } from "@/shared/types";

import { ItemRatingReadonly } from "../post-meta/item-rating-readonly";

import { BodyStyled, PostOverviewFooter, PostOverviewStyled } from "./style";
import { OverviewTitle } from "./overview-title";
import { OverviewExcerpt } from "./overview-excerpt";

export const PostOverview: FC<HasItem<PostPreview>> = ({ item }) => (
    <PostOverviewStyled>
        <RouterDomLink
            data-testid="post-overview/post-slug-link"
            to={createAbsolutePostsPath(item.slug)}
        >
            <BodyStyled>
                <OverviewTitle title={item.title} />
                <OverviewExcerpt excerpt={item.excerpt} />
            </BodyStyled>
        </RouterDomLink>
        <PostOverviewFooter>
            <UserInfo
                author={item.author}
                createdAt={item.createdAt}
                formattedCreatedAt={item.formattedCreatedAt}
            />
            <PostMeta meta={item.meta}>
                <ItemRatingReadonly meta={item.meta} />
            </PostMeta>
        </PostOverviewFooter>
    </PostOverviewStyled>
);
