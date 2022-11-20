import React from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.bubble.css";

const EDITOR_THEME = "bubble";

export type EditorProps = ReactQuillProps & {
    editorRef?: React.RefObject<ReactQuill>;
};

export const Editor = ({ editorRef, ...rest }: EditorProps) => (
    <ReactQuill
        theme={EDITOR_THEME}
        ref={editorRef}
        {...rest}
    />
);
