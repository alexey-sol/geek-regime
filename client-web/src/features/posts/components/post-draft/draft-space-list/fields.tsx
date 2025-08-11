import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import {
    Field, useFormikContext, type ArrayHelpers, type FieldProps,
} from "formik";
import { AddItemIconButton } from "@eggziom/geek-regime-js-ui-kit/components/icon-button";

import { type SavePostValues } from "../types";
import { RelativePositionWrapStyled } from "../style";
import { BLANK_SPACE, BLANK_SPACE_INDEX } from "../const";
import { omitBlankSpace } from "../utils";

import { TagInputStyled } from "./style";

import { FieldErrorMessage } from "@/shared/components/typography";
import { hasTitle } from "@/shared/utils/guards";
import { TagStyled } from "@/shared/components/tag";
import { SpaceTag } from "@/features/spaces/components/tag";
import { type Space } from "@/features/spaces/models/entities";
import { normalizeString } from "@/shared/utils/helpers/string";

type AppendSpaceFieldProps = Pick<ArrayHelpers, "replace" | "unshift"> & {
    index: number;
};

export const AppendSpaceField: FC<AppendSpaceFieldProps> = ({ index, replace, unshift }) => {
    const { t } = useTranslation();
    const { errors, values } = useFormikContext<SavePostValues>();

    const spaceError = errors?.spaces?.[BLANK_SPACE_INDEX];
    const spaceErrorMessage = hasTitle(spaceError) && spaceError.title;

    const isValidSpaceTitle = (spaceTitle: string) => {
        const spacesToPersist = omitBlankSpace(values.spaces);

        return (
            !!spaceTitle
            && !spacesToPersist.find(({ title }) =>
                normalizeString(spaceTitle) === normalizeString(title))
            && !errors.spaces
        );
    };

    const appendSpace = (value: string) => {
        const title = value?.trim();

        if (!isValidSpaceTitle(title)) {
            return;
        }

        const newSpace: Partial<Space> = {
            isOfficial: false,
            title,
        };

        unshift(newSpace);
        replace(BLANK_SPACE_INDEX, BLANK_SPACE);
    };

    return (
        <RelativePositionWrapStyled>
            <Field name={`spaces.${index}.title`}>
                {({ field }: FieldProps<string>) => (
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
                            fontSize="xxs"
                            onClick={(event) => {
                                event.preventDefault();
                                appendSpace(field.value);
                            }}
                        />
                    </TagStyled>
                )}
            </Field>

            {spaceErrorMessage && <FieldErrorMessage>{spaceErrorMessage}</FieldErrorMessage>}
        </RelativePositionWrapStyled>
    );
};

type SpaceFieldProps = {
    index: number;
    onClick: () => void;
    space: Partial<Space>;
};

export const SpaceField: FC<SpaceFieldProps> = ({
    index, onClick, space,
}) => (
    <Field name={`spaces.${index}.title`}>
        {({ field }: FieldProps<string>) => (
            <SpaceTag
                isActive={space.isActive}
                isOfficial={space.isOfficial}
                onClick={onClick}
            >
                {field.value}
            </SpaceTag>
        )}
    </Field>
);
