import React, {
    type FC, useCallback, useEffect, useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import type Quill from "quill";

import { subscribeToResetAbout, unsubscribeFromResetAbout } from "./utils";
import { AboutEditorStyled } from "./styles";
import { type ProfileSettingsValues } from "./types";

import { FieldErrorMessage } from "@/shared/components/typography";
import { setHtmlValue } from "@/shared/utils/helpers/editor";
import { type EditorProps } from "@/shared/components/editor";

type AboutEditorProps = Pick<EditorProps, "initialValue"> & {
    errorMessage?: string;
};

export const AboutEditor: FC<AboutEditorProps> = ({ errorMessage, initialValue }) => {
    const { t } = useTranslation();
    const editorRef = useRef<Quill>(null);
    const { handleChange } = useFormikContext<ProfileSettingsValues>();

    const onChange = useCallback((value: string) => {
        handleChange("details.about")(value);
    }, [handleChange]);

    useEffect(() => {
        const resetAbout = () => editorRef.current && setHtmlValue(editorRef.current, initialValue);

        subscribeToResetAbout(resetAbout);

        return () => {
            unsubscribeFromResetAbout(resetAbout);
        };
    }, [initialValue]);

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
