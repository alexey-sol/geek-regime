import React, { memo, type ReactNode, type RefObject } from "react";
import { Button } from "@eggziom/geek-regime-js-ui-kit/components/button";
import { CloseIconButton } from "@eggziom/geek-regime-js-ui-kit/components/icon-button";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { useTranslation } from "react-i18next";
import type Quill from "quill";

import { CommentEditorStyled, HeaderStyled, CommentBoxStyled } from "./style";

import { FieldErrorMessage } from "@/shared/components/typography";

export type CommentBoxProps = {
    body: string;
    disableSubmit?: boolean;
    editorRef?: RefObject<Quill>;
    errorMessage?: string;
    onClose: () => void;
    onSubmit?: () => void;
    placeholder?: string;
    setBody: (body: string) => void;
    title?: ReactNode;
};

export const CommentBox = memo(({
    body,
    disableSubmit = false,
    editorRef,
    errorMessage,
    onClose,
    onSubmit,
    placeholder,
    setBody,
    title,
}: CommentBoxProps) => {
    const { t } = useTranslation();

    return (
        <CommentBoxStyled>
            <HeaderStyled>
                <Typography fontSize="sm">
                    {title ?? t("shared.actions.leaveComment")}
                </Typography>
                <CloseIconButton onClick={onClose} />
            </HeaderStyled>
            <CommentEditorStyled
                editorRef={editorRef}
                initialValue={body}
                onChange={setBody}
                placeholder={placeholder}
            />
            {errorMessage && <FieldErrorMessage>{errorMessage}</FieldErrorMessage>}
            <Button disabled={disableSubmit} onClick={onSubmit}>
                {t("shared.actions.send")}
            </Button>
        </CommentBoxStyled>
    );
});
