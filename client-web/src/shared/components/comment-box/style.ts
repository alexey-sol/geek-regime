import styled from "styled-components";

import { Editor } from "@/shared/components/editor";

export const CommentBoxStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 1rem;
`;

export const CommentEditorStyled = styled(Editor)`
    min-height: 10rem;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: 0.25rem;
`;

export const HeaderStyled = styled.section`
    display: flex;
    justify-content: space-between;
`;
