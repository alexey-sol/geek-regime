import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    font-size: ${({ theme }) => theme.fontSizes.normal};
`;

export const BodyEditorWrapStyled = styled.section`
    position: relative;

`;

export const BodyEditorStyled = styled(ReactQuill)`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow-y: hidden;

    .ql-container {
        height: 100%;
        border: none !important;
    }

    .ql-toolbar {
        border: none !important;
    }

    .ql-editor {
        overflow-y: auto;
        font-family: ${({ theme }) => theme.fonts.normal};
        font-size: ${({ theme }) => theme.fontSizes.normal};

        &.ql-blank::before{
            font-style: normal;
        }
    }
`;

export const ControlsWrapStyled = styled.section`
    display: flex;
    padding: 0 1.5rem;
    gap: 1rem;
`;
