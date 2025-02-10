import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ChangeEventHandler,
    type FC,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "@eggziom/geek-regime-js-ui-kit";
import type Quill from "quill";

import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import type { CreatePostOnSaveArg } from "@/features/posts/utils/hooks/types";
import type { PostDetails } from "@/features/posts/models/entities";

import {
    PostEditorStyled,
    BodyEditorWrapStyled,
    ControlsWrapStyled,
    PostDraftStyled,
    TitleInputStyled,
} from "./style";

export type PostDraftProps = {
    post?: PostDetails;
};

export const PostDraft: FC<PostDraftProps> = ({ post }) => {
    const editorRef = useRef<Quill>(null);

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
        ? t("posts.draft.actions.updatePostButton.title")
        : t("posts.draft.actions.createPostButton.title");

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
        <PostDraftStyled>
            <TitleInputStyled
                value={values.title}
                onChange={handleTitleChange}
                placeholder={t("posts.draft.title.placeholder")}
            />

            <BodyEditorWrapStyled>
                <PostEditorStyled
                    editorRef={editorRef}
                    initialValue={values.body}
                    onChange={handleBodyChange}
                    placeholder={t("posts.draft.body.placeholder")}
                />
            </BodyEditorWrapStyled>

            <ControlsWrapStyled>
                <Button onClick={handleClickOnSaveButton} view="secondary">
                    {savePostButtonTitle}
                </Button>

                <Button onClick={goBack}>
                    {t("posts.draft.actions.cancelButton.title")}
                </Button>
            </ControlsWrapStyled>
        </PostDraftStyled>
    );
};
