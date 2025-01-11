import React from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.bubble.css";
import styled from "styled-components";

const EDITOR_THEME = "bubble";

export type EditorProps = ReactQuillProps & {
    editorRef?: React.RefObject<ReactQuill>;
};

export const Editor = styled(({
    editorRef,
    ...rest
}: EditorProps) => (
    <ReactQuill
        theme={EDITOR_THEME}
        ref={editorRef}
        {...rest}
    />
))`
    .ql-editor {
        font-family: ${({ theme }) => theme.fonts.normal};
        font-size: ${({ theme }) => theme.fontSizes.md};

        &.ql-blank::before {
            font-style: normal;
        }
    }
`;
