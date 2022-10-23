import React from "react";
import { Typography } from "@/shared/components/typography";
import { Post } from "@/features/posts/models/entities";
import { Link } from "react-router-dom";
import { path } from "@/shared/const";
import styled from "styled-components";
import { PostOverviewStyled } from "./style";

export type PostOverviewProps = {
    post: Post;
};

const lineHeight = 1.2;
const lineCount = 2;

export const TitleStyled = styled(Typography)`
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${({ theme }) => theme.fontSizes.large};
    font-weight: bold;
`;

export const ExcerptStyled = styled(Typography)`
    position: relative;
    display: -webkit-box;
    max-width: 100%;
    max-height: calc(${({ theme }) => theme.fontSizes.normal} * ${lineCount} * ${lineHeight});
    line-height: ${lineHeight};
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const PostOverview = ({ post }: PostOverviewProps) => (
    <PostOverviewStyled>
        <Link to={`/${path.POSTS}/${post.slug}`}>
            <section>
                <TitleStyled>{post.title}</TitleStyled>
                <ExcerptStyled>{post.excerpt}</ExcerptStyled>
            </section>
        </Link>

        <section>
            <Typography i18nKey="post.createdAt" />
            <Typography>{post.getFormattedCreatedAt()}</Typography>

            <Typography i18nKey="post.updatedAt" />
            <Typography>{post.getFormattedUpdatedAt()}</Typography>
        </section>
    </PostOverviewStyled>
);
