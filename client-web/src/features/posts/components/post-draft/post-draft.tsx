import React, {
    type FC, useEffect, useMemo, useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Button } from "@eggziom/geek-regime-js-ui-kit";
import type Quill from "quill";
import {
    ErrorMessage, Field, Formik, type FormikConfig, type FormikProps, type FieldProps,
} from "formik";

import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { useAppDispatch } from "@/app/store/hooks";
import { Skeleton } from "@/shared/components/loaders";
import { type CreatePostOnSaveArg } from "@/features/posts/utils/hooks/types";
import { type SaveSpaceRequest } from "@/features/spaces/models/dtos";
import { type Space } from "@/features/spaces/models/entities";
import { getPostSchema } from "@/features/posts/utils/validation/schemas";

import { DraftEditor } from "./draft-editor";
import { handleTitleKeyDown, omitBlankSpace } from "./utils";
import { DraftSpaceList } from "./draft-space-list";
import {
    ControlsWrapStyled,
    FieldErrorMessageStyled,
    PostDraftFormStyled,
    RelativePositionWrapStyled,
    TitleInputStyled,
} from "./style";
import { BLANK_SPACE } from "./const";

const DEFAULT_SPACES: (SaveSpaceRequest & Pick<Space, "isOfficial">)[] = [];

export const PostDraft: FC = () => {
    const formRef = useRef<FormikProps<CreatePostOnSaveArg>>(null);
    const editorRef = useRef<Quill>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pending, post, savePost } = useActivePost();
    const { t } = useTranslation();

    const isLoading = !!pending;

    const goBack = () => navigate(-1);

    const { body = "", spaces = DEFAULT_SPACES, title = "" } = post ?? {};
    const initialValues: CreatePostOnSaveArg = useMemo(() => ({
        body,
        spaces: [BLANK_SPACE, ...spaces],
        title,
    }), [body, spaces, title]);

    const handleSubmit: FormikConfig<CreatePostOnSaveArg>["onSubmit"] = (values) => {
        const normValues = {
            ...values,
            spaces: omitBlankSpace(values.spaces),
        };

        try {
            savePost(
                normValues,
                () => dispatch(notify(createSuccessSnackbarArg(t("posts.query.update.success")))),
            );
        } catch (error) {
            console.error(error);
        }
    };

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
        <Formik<CreatePostOnSaveArg>
            enableReinitialize
            innerRef={formRef}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={getPostSchema()}
        >
            {({ values }) => (
                <PostDraftFormStyled>
                    <Skeleton isLoading={isLoading} heightPx={46}>
                        <RelativePositionWrapStyled>
                            <Field name="title">
                                {({ field }: FieldProps<string>) => (
                                    <TitleInputStyled
                                        onKeyDown={handleTitleKeyDown}
                                        placeholder={t("posts.draft.title.placeholder")}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            </Field>

                            <ErrorMessage name="title">
                                {(errorMessage) => <FieldErrorMessageStyled>{errorMessage}</FieldErrorMessageStyled>}
                            </ErrorMessage>
                        </RelativePositionWrapStyled>
                    </Skeleton>

                    <Skeleton isLoading={isLoading} heightPx={200}>
                        <DraftEditor initialValue={body} />
                    </Skeleton>

                    <Skeleton isLoading={isLoading} heightPx={22} widthPx={300}>
                        <DraftSpaceList />
                    </Skeleton>

                    <Skeleton isLoading={isLoading} heightPx={36} widthPx={180}>
                        <ControlsWrapStyled>
                            <Button disabled={isLoading} type="submit" view="secondary">
                                {savePostButtonTitle}
                            </Button>

                            <Button disabled={isLoading} onClick={goBack}>
                                {t("posts.draft.actions.cancelButton.title")}
                            </Button>
                        </ControlsWrapStyled>
                    </Skeleton>
                </PostDraftFormStyled>
            )}
        </Formik>
    );
};
