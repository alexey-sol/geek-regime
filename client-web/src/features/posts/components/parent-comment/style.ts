import styled, { css } from "styled-components";
import { type Color } from "@eggziom/geek-regime-js-ui-kit/types";

import { PICTURE_SIZE_PX } from "../user-info/const";

export const commentListLayoutCss = css`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const ReplyListStyled = styled.ul`
    position: relative;
    padding-top: 1rem;
    padding-left: 2rem;
    ${commentListLayoutCss};
`;

export const ReplyItemStyled = styled.li`
    position: relative;
    display: flex;
`;

type CommentBranchStyledProps = {
    isFirst?: boolean;
    isLast?: boolean;
};

const branchLeafItemHeight = `${Math.floor(PICTURE_SIZE_PX / 2)}px`;

const BRANCH_WIDTH = "1rem";
const BRANCH_BORDER_RADIUS = "0.75rem";
const BRANCH_COLOR: Color = "grey";

export const CommentBranchStyled = styled.section<CommentBranchStyledProps>(
    ({ theme, isLast = false, isFirst = false }) => css`
        /** "Core" branch styling. Adds the main vertical branch and a leaf for the last list
        item. **/
        position: absolute;
        top: 0;
        left: -1.5rem;
        width: ${BRANCH_WIDTH};
        height: ${isLast ? branchLeafItemHeight : "100%"};
        border-bottom: ${isLast ? `1px solid ${theme.colors[BRANCH_COLOR]}` : "none"};
        border-left: 1px solid ${theme.colors[BRANCH_COLOR]};
        border-bottom-left-radius: ${isLast ? BRANCH_BORDER_RADIUS : 0};

        /** Adds branch leafs leading to list items. **/
        ${!isLast && css`
            &:before {
                position: absolute;
                width: ${BRANCH_WIDTH};
                height: ${branchLeafItemHeight};
                border-bottom: 1px solid ${theme.colors[BRANCH_COLOR]};
                border-bottom-left-radius: ${BRANCH_BORDER_RADIUS};
                content: "";
            }
        `};

        /** Adds short vertical branch segments between list items to overlap gaps between
        them. **/
        &:after {
            position: absolute;
            top: ${isFirst ? "-0.5rem" : "-2.5rem"};
            right: 0;
            width: ${BRANCH_WIDTH};
            height: ${isFirst ? "0.5rem" : "2.5rem"};;
            border-left: 1px solid ${theme.colors[BRANCH_COLOR]};
            content: "";
        }
    `,
);
