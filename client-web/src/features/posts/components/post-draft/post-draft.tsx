import React, {
    type FC, useMemo, useRef,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@eggziom/geek-regime-js-ui-kit/components/button";
import { Skeleton } from "@eggziom/geek-regime-js-ui-kit/components/loaders";
import {
    ErrorMessage, Field, Formik, type FormikConfig, type FormikProps, type FieldProps,
} from "formik";

import { DraftEditor } from "./draft-editor";
import { createSpaceValues, handleTitleKeyDown, pickActiveSpaces } from "./utils";
import { DraftSpaceList } from "./draft-space-list";
import { type SavePostValues } from "./types";
import {
    ControlsWrapStyled,
    FieldErrorMessageStyled,
    PostDraftFormStyled,
    RelativePositionWrapStyled,
    TitleInputStyled,
} from "./style";
import { DEFAULT_SPACES, MAX_SPACE_COUNT } from "./const";

import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { useAppDispatch } from "@/app/store/hooks";
import { getPostSchema } from "@/features/posts/utils/validation/schemas";
import { toSaveSpaceRequestList } from "@/features/spaces/utils/converters";

export const PostDraft: FC = () => {
    const formRef = useRef<FormikProps<SavePostValues>>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pending, post, savePost } = useActivePost();
    const { t } = useTranslation();

    const isLoading = !!pending;

    const goBack = () => navigate(-1);

    const { body = "", spaces = DEFAULT_SPACES, title = "" } = post ?? {};
    const initialValues: SavePostValues = useMemo(() => ({
        body,
        spaces: createSpaceValues(spaces),
        title,
    }), [body, spaces, title]);

    const handleSubmit: FormikConfig<SavePostValues>["onSubmit"] = (values) => {
        const mappedValues = {
            ...values,
            spaces: toSaveSpaceRequestList(pickActiveSpaces(values.spaces)),
        };

        const isValid = mappedValues.spaces.length <= MAX_SPACE_COUNT;

        if (!isValid) {
            return;
        }

        try {
            savePost(
                mappedValues,
                () => dispatch(notify(createSuccessSnackbarArg(t("posts.query.update.success")))),
            );
        } catch (error) {
            console.error(error);
        }
    };

    const savePostButtonTitle = post
        ? t("posts.draft.actions.updatePostButton.title")
        : t("posts.draft.actions.createPostButton.title");

    return (
        <Formik<SavePostValues>
            enableReinitialize
            innerRef={formRef}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={getPostSchema()}
        >
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

                <Skeleton isLoading={isLoading} heightPx={22}>
                    <DraftSpaceList />
                </Skeleton>

                <Skeleton isLoading={isLoading} heightPx={36} widthPx={180}>
                    <ControlsWrapStyled>
                        <Button disabled={isLoading} onClick={goBack}>
                            {t("posts.draft.actions.cancelButton.title")}
                        </Button>

                        <Button disabled={isLoading} type="submit" view="secondary">
                            {savePostButtonTitle}
                        </Button>
                    </ControlsWrapStyled>
                </Skeleton>
            </PostDraftFormStyled>
        </Formik>
    );
};
