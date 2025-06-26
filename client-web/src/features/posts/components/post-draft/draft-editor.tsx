import React, {
    type FC, useCallback, useEffect, useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import type Quill from "quill";

import { FieldErrorMessage } from "@/shared/components/typography";
import { type EditorProps } from "@/shared/components/editor";

import { type SavePostValues } from "./types";
import { DraftEditorStyled, RelativePositionWrapStyled } from "./style";

export const DraftEditor: FC<Pick<EditorProps, "initialValue">> = ({ initialValue }) => {
    const editorRef = useRef<Quill>(null);
    const { errors, handleChange } = useFormikContext<SavePostValues>();
    const { t } = useTranslation();

    const handleBodyChange = useCallback((value: string) => {
        handleChange("body")(value);
    }, [handleChange]);

    useEffect(() => {
        const focusOnDraftBodyIfPossible = () => {
            if (editorRef.current) {
                const index = editorRef.current.getText().length;

                editorRef.current.setSelection(index);
            }
        };

        focusOnDraftBodyIfPossible();
    }, []);

    return (
        <RelativePositionWrapStyled>
            <DraftEditorStyled
                editorRef={editorRef}
                initialValue={initialValue}
                onChange={handleBodyChange}
                placeholder={t("posts.draft.body.placeholder")}
            />

            {!!errors?.body && <FieldErrorMessage>{errors?.body}</FieldErrorMessage>}
        </RelativePositionWrapStyled>
    );
};
