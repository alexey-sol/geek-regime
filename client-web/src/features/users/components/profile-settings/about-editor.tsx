import React, { type FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import type Quill from "quill";

import { FieldErrorMessage } from "@/shared/components/typography";
import { type EditorProps } from "@/shared/components/editor";
import { type UpdateUserRequest } from "@/features/users/models/dtos";

import { AboutEditorStyled } from "./styles";

type AboutEditorProps = Pick<EditorProps, "initialValue"> & {
    errorMessage?: string;
};

export const AboutEditor: FC<AboutEditorProps> = ({ errorMessage, initialValue }) => {
    const { t } = useTranslation();
    const editorRef = useRef<Quill>(null);
    const { handleChange } = useFormikContext<UpdateUserRequest>();

    const onChange = useCallback((value: string) => {
        handleChange("details.about")(value);
    }, [handleChange]);

    return (
        <section>
            <AboutEditorStyled
                editorRef={editorRef}
                initialValue={initialValue}
                onChange={onChange}
                placeholder={t("users.profile.settings.profile.about.placeholder")}
            />

            {errorMessage && <FieldErrorMessage>{errorMessage}</FieldErrorMessage>}
        </section>
    );
};
