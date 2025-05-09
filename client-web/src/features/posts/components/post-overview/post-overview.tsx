import React, { type FC } from "react";
import { Link as RouterDomLink } from "react-router-dom";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { PostMeta } from "@/features/posts/components/post-meta";
import { AuthorInfo } from "@/features/posts/components/user-info";
import { type PostPreview } from "@/features/posts/models/entities";
import { MaybeStubItem, type HasItem } from "@/shared/types";
import { Skeleton } from "@/shared/components/loaders";
import { isStubItem } from "@/shared/utils/helpers/object";
import { usePrefetch } from "@/features/posts/services/posts-api";

import { ItemRatingReadonly } from "../post-meta/item-rating-readonly";

import { BodyStyled, PostOverviewFooter, PostOverviewStyled } from "./style";
import { OverviewTitle } from "./overview-title";
import { OverviewExcerpt } from "./overview-excerpt";

export const PostOverview: FC<HasItem<MaybeStubItem<PostPreview>>> = ({ item }) => {
    const isLoading = isStubItem(item);

    const prefetchPostBySlug = usePrefetch("getPostBySlug");

    return (
        <PostOverviewStyled onMouseEnter={() => item.slug && prefetchPostBySlug(item.slug)}>
            <RouterDomLink
                data-testid="post-overview/post-slug-link"
                to={createAbsolutePostsPath(item.slug ?? "")}
            >
                <BodyStyled>
                    <Skeleton isLoading={isLoading} heightPx={44}>
                        <OverviewTitle title={item.title ?? ""} />
                    </Skeleton>

                    <Skeleton isLoading={isLoading} heightPx={44}>
                        <OverviewExcerpt excerpt={item.excerpt ?? ""} />
                    </Skeleton>
                </BodyStyled>
            </RouterDomLink>
            <PostOverviewFooter>
                <Skeleton isLoading={isLoading} heightPx={30} widthPx={210}>
                    <AuthorInfo
                        author={item.author}
                        createdAt={item.createdAt ?? ""}
                        formattedCreatedAt={item.formattedCreatedAt ?? ""}
                    />
                </Skeleton>

                <Skeleton isLoading={isLoading} heightPx={20} widthPx={100}>
                    {!!item.meta && (
                        <PostMeta meta={item.meta}>
                            <ItemRatingReadonly meta={item.meta} />
                        </PostMeta>
                    )}
                </Skeleton>
            </PostOverviewFooter>
        </PostOverviewStyled>
    );
};
