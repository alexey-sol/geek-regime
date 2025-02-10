import styled from "styled-components";

import { Editor } from "@/shared/components/editor";
import { mixins } from "@/app/style/mixins";

export const PostDraftStyled = styled.section`
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
    row-gap: 2rem;
`;

export const TitleInputStyled = styled.input`
    padding: 1rem 1.5rem;
    font-family: ${({ theme }) => theme.fonts.normal};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
    outline: none;
    ${mixins.getEditorBorder()};
`;

export const BodyEditorWrapStyled = styled.section`
    position: relative;
`;

export const PostEditorStyled = styled(Editor)`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    ${mixins.getEditorBorder()};
`;

export const ControlsWrapStyled = styled.section`
    display: flex;
    gap: 1rem;
`;
