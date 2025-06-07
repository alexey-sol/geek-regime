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
import { SpaceList } from "@/features/spaces/components/space-list";
import { OverviewExcerpt, OverviewTitle } from "@/shared/components/typography";

import { ItemRatingReadonly } from "../post-meta/item-rating-readonly";

import { BodyStyled, PostOverviewFooter, PostOverviewStyled } from "./style";

const TITLE_MAX_LINE_COUNT = 2;
const EXCERPT_MAX_LINE_COUNT = 2;

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
                        {!!item.title && (
                            <OverviewTitle maxLineCount={TITLE_MAX_LINE_COUNT} title={item.title}>
                                {item.title}
                            </OverviewTitle>
                        )}
                    </Skeleton>

                    <Skeleton isLoading={isLoading} heightPx={44}>
                        {!!item.excerpt && (
                            <OverviewExcerpt maxLineCount={EXCERPT_MAX_LINE_COUNT}>
                                {item.excerpt}
                            </OverviewExcerpt>
                        )}
                    </Skeleton>
                </BodyStyled>
            </RouterDomLink>

            <Skeleton isLoading={isLoading} heightPx={22} widthPx={300}>
                {!!item.spaces?.length && (
                    <SpaceList spaces={item.spaces} />
                )}
            </Skeleton>

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
