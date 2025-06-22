import Quill from "quill";
import React, {
    useEffect, useRef, memo, type MutableRefObject,
} from "react";
import "quill/dist/quill.bubble.css";
import styled from "styled-components";
import { type HasClassName } from "@eggziom/geek-regime-js-ui-kit";

import { setHtmlValue } from "@/shared/utils/helpers/editor";

const CONTAINER_ID = "editor";
const EDITOR_THEME = "bubble";

const EditorStyled = styled.section`
    word-break: break-word;

    .ql-editor {
        font-family: ${({ theme }) => theme.fonts.normal};
        font-size: ${({ theme }) => theme.fontSizes.md};

        &.ql-blank::before {
            font-style: normal;
        }
    }
`;

export type EditorProps = Partial<HasClassName> & Pick<Quill["options"], "placeholder"> & {
    editorRef?: MutableRefObject<Quill | null>;
    initialValue?: string;
    onChange?: (value: string) => void;
};

export const Editor = memo<EditorProps>(({
    className,
    editorRef,
    initialValue = "",
    onChange,
    placeholder,
}) => {
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        const quill = new Quill(`#${CONTAINER_ID}`, {
            theme: EDITOR_THEME,
            placeholder,
        });

        quillRef.current = quill;

        if (editorRef) {
            editorRef.current = quill;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- [1]
    }, [editorRef]);

    useEffect(() => {
        const quill = quillRef.current;

        if (quill) {
            setHtmlValue(quill, initialValue);

            quill.on("text-change", () => {
                const text = quill.getText().trim();
                const html = quill.root.innerHTML;

                onChange?.(text.length === 0 ? "" : html);
            });
        }
    }, [editorRef, initialValue, onChange]);

    return (
        <EditorStyled className={className} id={CONTAINER_ID} />
    );
});

// [1]. Omitting placeholder since, as it turns out, there's no non-hacky way to update it without
// reinitializing the whole editor.
