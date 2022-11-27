import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router";

import { Button } from "@/shared/components/button";
import type { PostDto } from "@/features/posts/models/dtos";
import type { Post } from "@/features/posts/models/entities";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";

import {
    BodyEditorStyled,
    BodyEditorWrapStyled,
    ControlsWrapStyled,
    PostDraftStyled,
    TitleInputStyled,
} from "./style";

export type PostDraftProps = {
    post?: Post;
};

export const PostDraft = ({ post }: PostDraftProps) => {
    const { savePost } = useActivePost();

    const initialTitleValue = post?.title ?? "";
    const initialBodyValue = post?.body ?? "";
    const [draftTitle, setDraftTitle] = useState<string>(initialTitleValue);
    const [draftBody, setDraftBody] = useState<string>(initialBodyValue);
    const bodyEditorRef = useRef<ReactQuill>(null);

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const { t } = useTranslation();

    const values: Pick<PostDto, "title" | "body"> = useMemo(() => ({
        title: draftTitle,
        body: draftBody,
    }), [draftBody, draftTitle]);

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
                value={draftTitle}
                onChange={({ target }) => setDraftTitle(target.value)}
                placeholder={t("draft.title.placeholder")}
            />

            <BodyEditorWrapStyled>
                <BodyEditorStyled
                    editorRef={bodyEditorRef}
                    onChange={setDraftBody}
                    placeholder={t("draft.body.placeholder")}
                    value={draftBody}
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
