import React, { memo, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import type Quill from "quill";

import { type CreatePostOnSaveArg } from "@/features/posts/utils/hooks/types";
import { FieldErrorMessage } from "@/shared/components/typography";

import { PostEditorStyled, RelativePositionWrapStyled } from "./style";

type DraftEditorProps = {
    initialValue?: string;
};

export const DraftEditor = memo<DraftEditorProps>(({ initialValue }) => {
    const editorRef = useRef<Quill>(null);
    const { errors, handleChange } = useFormikContext<CreatePostOnSaveArg>();
    const { t } = useTranslation();

    const handleBodyChange = useCallback((value: string) => {
        handleChange("body")(value);
    }, [handleChange]);

    return (
        <RelativePositionWrapStyled>
            <PostEditorStyled
                editorRef={editorRef}
                initialValue={initialValue}
                onChange={handleBodyChange}
                placeholder={t("posts.draft.body.placeholder")}
            />

            {errors?.body && <FieldErrorMessage>{errors?.body}</FieldErrorMessage>}
        </RelativePositionWrapStyled>
    );
});
