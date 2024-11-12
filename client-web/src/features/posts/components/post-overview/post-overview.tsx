import React, { type FC } from "react";
import { Link as RouterDomLink } from "react-router-dom";
import { Link } from "@eggziom/geek-regime-js-ui-kit";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { type UserPostPreview } from "@/features/posts/models/entities";
import { type HasItem } from "@/shared/types";
import { PostMeta } from "@/features/posts/components/post-meta";

import { ItemRatingReadonly } from "../post-meta/item-rating-readonly";

import {
    BodyStyled,
    InfoWrapStyled,
    PostOverviewFooter,
    PostOverviewStyled,
    TwoLineTextStyled,
} from "./style";
import { OverviewTitle } from "./overview-title";
import { OverviewExcerpt } from "./overview-excerpt";

export const PostOverview: FC<HasItem<UserPostPreview>> = ({ item }) => (
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
            <InfoWrapStyled>
                <TwoLineTextStyled>
                    <Link
                        data-testid="post-overview/author-slug-link"
                        to={createAbsoluteUsersPath(item.author.slug)}
                    >
                        {item.author.details.name}
                    </Link>
                    {" "}
                    &mdash;
                    {" "}
                    {item.formattedCreatedAt}
                </TwoLineTextStyled>
            </InfoWrapStyled>

            <PostMeta meta={item.meta}>
                <ItemRatingReadonly meta={item.meta} />
            </PostMeta>
        </PostOverviewFooter>
    </PostOverviewStyled>
);
