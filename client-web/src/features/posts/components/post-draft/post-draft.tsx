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
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { useAppDispatch } from "@/app/store/hooks";
import { Skeleton } from "@/shared/components/skeleton";
import { type CreatePostOnSaveArg } from "@/features/posts/utils/hooks/types";

import {
    PostEditorStyled,
    BodyEditorWrapStyled,
    ControlsWrapStyled,
    PostDraftStyled,
    TitleInputStyled,
} from "./style";

export const PostDraft: FC = () => {
    const editorRef = useRef<Quill>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pending, post, savePost } = useActivePost();
    const { t } = useTranslation();

    const isLoading = !!pending;

    const goBack = () => navigate(-1);

    const { body = "", title = "" } = post ?? {};
    const initialValues: CreatePostOnSaveArg = useMemo(() => ({ body, title }), [body, title]);
    const [values, setValues] = useState<CreatePostOnSaveArg>(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

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
        savePost(
            values,
            () => dispatch(notify(createSuccessSnackbarArg(t("posts.query.update.success")))),
        );
    }, [dispatch, savePost, t, values]);

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
            <Skeleton isLoading={isLoading} heightPx={46}>
                <TitleInputStyled
                    value={values.title}
                    onChange={handleTitleChange}
                    placeholder={t("posts.draft.title.placeholder")}
                />
            </Skeleton>

            <Skeleton isLoading={isLoading} heightPx={200}>
                <BodyEditorWrapStyled>
                    <PostEditorStyled
                        editorRef={editorRef}
                        initialValue={body}
                        onChange={handleBodyChange}
                        placeholder={t("posts.draft.body.placeholder")}
                    />
                </BodyEditorWrapStyled>
            </Skeleton>

            <Skeleton isLoading={isLoading} heightPx={36} widthPx={180}>
                <ControlsWrapStyled>
                    <Button disabled={isLoading} onClick={handleClickOnSaveButton} view="secondary">
                        {savePostButtonTitle}
                    </Button>

                    <Button disabled={isLoading} onClick={goBack}>
                        {t("posts.draft.actions.cancelButton.title")}
                    </Button>
                </ControlsWrapStyled>
            </Skeleton>
        </PostDraftStyled>
    );
};
