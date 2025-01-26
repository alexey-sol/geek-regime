import React, { memo, type ReactNode, type RefObject } from "react";
import { Button, Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";

import { CloseIconButton } from "@/shared/components/icon-button";
import { FieldErrorMessage } from "@/shared/components/typography";

import { CommentEditorStyled, HeaderStyled, CommentBoxStyled } from "./style";

export type CommentBoxProps = {
    body: string;
    disableSubmit?: boolean;
    editorRef?: RefObject<ReactQuill>;
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
                <Typography fontSize='sm'>
                    {title ?? t("shared.actions.leaveComment")}
                </Typography>
                <CloseIconButton onClick={onClose} />
            </HeaderStyled>
            <CommentEditorStyled
                editorRef={editorRef}
                onChange={setBody}
                placeholder={placeholder}
                value={body}
            />
            {errorMessage && <FieldErrorMessage>{errorMessage}</FieldErrorMessage>}
            <Button disabled={disableSubmit} onClick={onSubmit}>
                {t("shared.actions.send")}
            </Button>
        </CommentBoxStyled>
    );
});
