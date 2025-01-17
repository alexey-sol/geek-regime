import styled from "styled-components";

import { Editor } from "@/shared/components/editor";

export const PostDraftStyled = styled.section`
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
    row-gap: 2rem;
`;

export const TitleInputStyled = styled.input`
    padding: 1.5rem;
    border: none;
    font-family: ${({ theme }) => theme.fonts.normal};
    font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const BodyEditorWrapStyled = styled.section`
    position: relative;
`;

export const PostEditorStyled = styled(Editor)`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;

    .ql-editor {
        overflow-y: scroll;
    }
`;

export const ControlsWrapStyled = styled.section`
    display: flex;
    padding: 0 1.5rem;
    gap: 1rem;
`;
