import React, { type FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
    Field, FieldArray, type FieldProps, type ArrayHelpers, useFormikContext,
} from "formik";

import { type CreatePostOnSaveArg } from "@/features/posts/utils/hooks/types";
import { AddItemIconButton } from "@/shared/components/icon-button";
import { FieldErrorMessage } from "@/shared/components/typography";
import { Tooltip } from "@/shared/components/tooltip";
import { hasTitle } from "@/shared/utils/guards";
import { TagStyled } from "@/shared/components/tag";
import { SpaceTag } from "@/features/spaces/components/tag";

import { omitBlankSpace } from "./utils";
import { DraftSpaceListStyled, RelativePositionWrapStyled, TagInputStyled } from "./style";
import { BLANK_SPACE, BLANK_SPACE_INDEX, MAX_SPACE_COUNT } from "./const";
import { type SpaceToPersist } from "./types";

type AppendSpaceFieldProps = Pick<ArrayHelpers, "push" | "replace"> & {
    index: number;
};

const AppendSpaceField: FC<AppendSpaceFieldProps> = ({ index, push, replace }) => {
    const { t } = useTranslation();
    const { errors, values } = useFormikContext<CreatePostOnSaveArg>();

    const spaceError = errors?.spaces?.[BLANK_SPACE_INDEX];
    const spaceErrorMessage = hasTitle(spaceError) && spaceError.title;
    const tagInputTooltip = `${t("posts.post.spaces.input.tooltip")}: ${MAX_SPACE_COUNT}`;

    const isValidSpaceTitle = (spaceTitle: string) => {
        const spacesToPersist = omitBlankSpace(values.spaces);

        return (
            !!spaceTitle
            && !spacesToPersist.find(({ title }) => spaceTitle === title)
            && !errors.spaces
            && spacesToPersist.length < MAX_SPACE_COUNT
        );
    };

    const appendSpace = (value: string) => {
        const title = value?.trim();

        if (!isValidSpaceTitle(title)) {
            return;
        }

        const newSpace: SpaceToPersist = {
            isOfficial: false,
            title,
        };

        push(newSpace);
        replace(BLANK_SPACE_INDEX, BLANK_SPACE);
    };

    return (
        <RelativePositionWrapStyled>
            <Field name={`spaces.${index}.title`}>
                {({ field }: FieldProps<string>) => (
                    <Tooltip message={tagInputTooltip}>
                        <TagStyled color="greyLighten">
                            <TagInputStyled
                                {...field}
                                autoComplete="off"
                                placeholder={t("posts.post.spaces.input.placeholder")}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        appendSpace(field.value);
                                    }
                                }}
                            />

                            <AddItemIconButton
                                disabled
                                fontSize="xxs"
                                onClick={(event) => {
                                    event.preventDefault();
                                    appendSpace(field.value);
                                }}
                            />
                        </TagStyled>
                    </Tooltip>
                )}
            </Field>

            {spaceErrorMessage && <FieldErrorMessage>{spaceErrorMessage}</FieldErrorMessage>}
        </RelativePositionWrapStyled>
    );
};

type SpaceFieldProps = Pick<ArrayHelpers, "remove"> & {
    index: number;
};

const SpaceField: FC<SpaceFieldProps> = ({ index, remove }) => (
    <Field name={`spaces.${index}.title`}>
        {({ field }: FieldProps<string>) => (
            <SpaceTag onClose={(event) => {
                event.preventDefault();
                remove(index);
            }}
            >
                {field.value}
            </SpaceTag>
        )}
    </Field>
);

export const DraftSpaceList: FC = () => {
    const { values } = useFormikContext<CreatePostOnSaveArg>();

    return (
        <FieldArray name="spaces">
            {({ remove, push, replace }) => (
                <DraftSpaceListStyled>
                    {!!values.spaces?.length && values.spaces.map((space, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={index}>
                            {index === BLANK_SPACE_INDEX
                                ? <AppendSpaceField index={index} push={push} replace={replace} />
                                : <SpaceField index={index} remove={remove} />}
                        </Fragment>
                    ))}
                </DraftSpaceListStyled>
            )}
        </FieldArray>
    );
};
