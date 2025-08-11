import React, { type FC, type PropsWithChildren } from "react";
import { Skeleton } from "@eggziom/geek-regime-js-ui-kit/components/loaders";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import styled, { css } from "styled-components";

import { AuthorInfo } from "@/features/posts/components/user-info";
import { type PostCommentBase } from "@/features/posts/models/entities";
import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { createInnerHtml } from "@/shared/utils/helpers/dom";

export const CommentContentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;

const CommentFooterStyled = styled.section`
    display: flex;
    gap: 1rem;
`;

type BodyTypographyStyledProps = {
    isHighlighted?: boolean;
};

const BodyTypographyStyled = styled(Typography)<BodyTypographyStyledProps>(
    ({ isHighlighted, theme }) => isHighlighted && css`
        background-color: ${theme.colors.orangeLighten};
        border-radius: 0.3rem;
    `,
);

type CommentContentProps = PropsWithChildren<HasItem<MaybeStubItem<PostCommentBase>>
    & BodyTypographyStyledProps
    & { isLoading?: boolean }>;

export const CommentContent: FC<CommentContentProps> = ({
    children,
    isHighlighted = false,
    isLoading = false,
    item,
}) => {
    const body = item.isDeleted
        ? <Typography color="grey">{item.body}</Typography>
        : (
            <BodyTypographyStyled
                dangerouslySetInnerHTML={createInnerHtml(item.body ?? "")}
                isHighlighted={isHighlighted}
            />
        );

    return (
        <CommentContentStyled>
            <Skeleton isLoading={isLoading} heightPx={30} widthPx={210}>
                <AuthorInfo
                    author={item.author}
                    createdAt={item.createdAt ?? ""}
                    formattedCreatedAt={item.formattedCreatedAt ?? ""}
                />
            </Skeleton>

            <Skeleton isLoading={isLoading} heightPx={60}>
                {body}
            </Skeleton>

            <Skeleton isLoading={isLoading} heightPx={15} widthPx={150}>
                <CommentFooterStyled>
                    {children}
                </CommentFooterStyled>
            </Skeleton>
        </CommentContentStyled>
    );
};
