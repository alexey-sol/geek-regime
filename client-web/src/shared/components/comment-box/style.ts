import styled from "styled-components";

import { Editor } from "@/shared/components/editor";
import { mixins } from "@/app/style/mixins";

export const CommentBoxStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;
`;

export const CommentEditorStyled = styled(Editor)`
    min-height: 10rem;
    ${mixins.getEditorBorder()};
`;

export const HeaderStyled = styled.section`
    display: flex;
    justify-content: space-between;
`;
