import Quill from "quill";
import React, {
    useEffect, useRef, type MutableRefObject, type FC,
} from "react";
import "quill/dist/quill.bubble.css";
import styled from "styled-components";
import { type HasClassName } from "@eggziom/geek-regime-js-ui-kit";

const CONTAINER_ID = "editor";
const EDITOR_THEME = "bubble";

const EditorStyled = styled.section`
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

export const Editor: FC<EditorProps> = ({
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
    }, [editorRef, placeholder]);

    useEffect(() => {
        const quill = quillRef.current;

        if (quill) {
            const delta = quill.clipboard.convert({ html: initialValue });
            quill.setContents(delta);

            quill.on("text-change", () => {
                onChange?.(quill.root.innerHTML);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- [1]
    }, [editorRef, onChange]);

    return (
        <EditorStyled className={className} id={CONTAINER_ID} />
    );
};

// [1]. Omitting "initialValue" since we want to set it only on mount.
