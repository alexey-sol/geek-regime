import styled, { css } from "styled-components";
import { Color } from "@eggziom/geek-regime-js-ui-kit";

const layoutCss = css`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
`;

export const CommentListStyled = styled.ul`
    ${layoutCss};
`;

export const CommentFooterStyled = styled.section`
    display: flex;
    gap: 1rem;
`;

export const PostCommentsStyled = styled.section`
    ${layoutCss};
`;

export const PostCommentsHeaderStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
`;

export const ReplyListStyled = styled.ul`
    position: relative;
    padding-top: 1rem;
    padding-left: 2rem;
    ${layoutCss};
`;

export const CommentStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;

export const ReplyItemStyled = styled.li`
    position: relative;
    display: flex;
`;

type CommentBranchStyledProps = {
    isFirst?: boolean;
    isLast?: boolean;
};

// TODO item height is most likely gonna change when I add user pic in the user info
const BRANCH_RECIPIENT_ITEM_HEIGHT = "1rem";
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
        height: ${isLast ? BRANCH_RECIPIENT_ITEM_HEIGHT : "100%"};
        border-bottom: ${isLast ? `1px solid ${theme.colors[BRANCH_COLOR]}` : "none"};
        border-left: 1px solid ${theme.colors[BRANCH_COLOR]};
        border-bottom-left-radius: ${isLast ? BRANCH_BORDER_RADIUS : 0};

        /** Adds branch leafs leading to list items. **/
        ${!isLast && css`
            &:before {
                position: absolute;
                width: ${BRANCH_WIDTH};
                height: ${BRANCH_RECIPIENT_ITEM_HEIGHT};
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
