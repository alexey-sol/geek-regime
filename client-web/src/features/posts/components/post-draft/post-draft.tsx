import React, {
    ChangeEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import ReactQuill from "react-quill";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Button } from "@/shared/components/button";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import type { CreatePostOnSaveArg } from "@/features/posts/utils/hooks/types";
import type { PostDetails } from "@/features/posts/models/entities";

import {
    BodyEditorStyled,
    BodyEditorWrapStyled,
    ControlsWrapStyled,
    PostDraftStyled,
    TitleInputStyled,
} from "./style";

export type PostDraftProps = {
    post?: PostDetails;
};

export const PostDraft = ({ post }: PostDraftProps) => {
    const bodyEditorRef = useRef<ReactQuill>(null);

    const { savePost } = useActivePost();

    const { t } = useTranslation();

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const { body = "", title = "" } = post ?? {};
    const initialValues: CreatePostOnSaveArg = useMemo(() => ({ body, title }), [body, title]);
    const [values, setValues] = useState<CreatePostOnSaveArg>(initialValues);

    const handleBodyChange = useCallback((newBody: string) => {
        setValues((oldValues) => ({
            ...oldValues,
            body: newBody,
        }));
    }, []);

    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ target }) => {
        if (!(target instanceof HTMLInputElement)) {
            return;
        }

        setValues((oldValues) => ({
            ...oldValues,
            title: target.value,
        }));
    }, []);

    const handleClickOnSaveButton = useCallback(() => {
        savePost(values);
    }, [savePost, values]);

    const savePostButtonTitle = post
        ? t("draft.controls.updatePostButton.title")
        : t("draft.controls.createPostButton.title");

    useEffect(() => {
        const focusOnDraftBodyIfPossible = () => {
            if (bodyEditorRef.current) {
                const { editor, value } = bodyEditorRef.current;
                const index = typeof value.length === "number" ? value.length : 0;

                if (editor) {
                    editor.setSelection(index, index);
                }
            }
        };

        focusOnDraftBodyIfPossible();
    }, []);

    return (
        <PostDraftStyled>
            <TitleInputStyled
                value={values.title}
                onChange={handleTitleChange}
                placeholder={t("draft.title.placeholder")}
            />

            <BodyEditorWrapStyled>
                <BodyEditorStyled
                    editorRef={bodyEditorRef}
                    onChange={handleBodyChange}
                    placeholder={t("draft.body.placeholder")}
                    value={values.body}
                />
            </BodyEditorWrapStyled>

            <ControlsWrapStyled>
                <Button onClick={handleClickOnSaveButton} view="secondary">
                    {savePostButtonTitle}
                </Button>

                <Button onClick={goBack}>
                    {t("draft.controls.cancelButton.title")}
                </Button>
            </ControlsWrapStyled>
        </PostDraftStyled>
    );
};
