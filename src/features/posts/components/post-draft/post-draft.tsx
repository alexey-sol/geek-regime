import React, {
    useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { Post } from "@/features/posts/models/entities";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import { useCreatePostMutation, useUpdatePostByIdMutation } from "@/features/posts/services/api";
import { PostDto } from "@/features/posts/models/dtos";
import {
    BodyEditorStyled,
    BodyEditorWrapStyled,
    ControlsWrapStyled,
    PostDraftStyled,
    TitleInputStyled,
} from "./post-draft.style";
import {useNavigate} from "react-router";

export type PostDraftProps = {
    post?: Post;
};

export const PostDraft = ({ post }: PostDraftProps) => {
    const initialTitleValue = post?.title ?? "";
    const initialBodyValue = post?.body ?? "";
    const [draftTitle, setDraftTitle] = useState<string>(initialTitleValue);
    const [draftBody, setDraftBody] = useState<string>(initialBodyValue);
    const bodyEditorRef = useRef<ReactQuill>(null);

    const [createPost, createPostResponse] = useCreatePostMutation();
    const [updatePostById, updatePostResponse] = useUpdatePostByIdMutation();

    const isLoading = createPostResponse.isLoading || updatePostResponse.isLoading;

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const { t } = useTranslation();

    const draftData: Pick<PostDto, "title" | "body"> = useMemo(() => ({
        title: draftTitle,
        body: draftBody,
    }), [draftBody, draftTitle]);

    const savePost = useCallback(() => ((post?.id)
        ? updatePostById({
            id: post.id,
            ...draftData,
        })
        : createPost({
            spaceId: 1, // TODO hardcoded
            userId: 1,
            ...draftData,
        })), [createPost, draftData, post?.id, updatePostById]);

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
                    onChange={setDraftBody}
                    placeholder={t("draft.body.placeholder")}
                    ref={bodyEditorRef}
                    value={draftBody}
                />
            </BodyEditorWrapStyled>

            <ControlsWrapStyled>
                <button onClick={savePost} type="button">
                    {savePostButtonTitle}
                </button>

                <button onClick={goBack} type="button">
                    {t("draft.controls.cancelButton.title")}
                </button>
            </ControlsWrapStyled>
        </PostDraftStyled>
    );
};
