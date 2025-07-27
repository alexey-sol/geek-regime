import React, {
    type FC, Fragment, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { useTranslation } from "react-i18next";
import { FieldArray, type FieldArrayRenderProps, useFormikContext } from "formik";
import {
    LinkButton, LinkButtonProps, Skeleton, Typography,
} from "@eggziom/geek-regime-js-ui-kit";
import { useLocation } from "react-router-dom";

import { Tag } from "@/shared/components/tag";
import { useGetAllMergedSpacesQuery } from "@/features/spaces/services/api";
import { toSpaceList } from "@/features/spaces/utils/converters";
import { defaults } from "@/shared/const";
import { type Space } from "@/features/spaces/models/entities";
import { mapPagingQueryParams } from "@/shared/utils/api";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { GetAllMergedSpacesArg } from "@/features/spaces/services/api/types";

import { type SavePostValues } from "../types";
import { BLANK_SPACE_INDEX, DEFAULT_SPACES, MAX_SPACE_COUNT } from "../const";
import { createSpaceValues, pickActiveSpaces, toActiveSpaceList } from "../utils";

import { DraftSpaceListStyled, ListStyled } from "./style";
import { AppendSpaceField, SpaceField } from "./fields";

export const DraftSpaceList: FC = () => {
    const allSpacesRef = useRef<Partial<Space>[]>(DEFAULT_SPACES);
    const arrayHelpersRef = useRef<FieldArrayRenderProps>();

    const location = useLocation();
    const { t } = useTranslation();
    const { values, setFieldValue } = useFormikContext<SavePostValues>();
    const [page, setPage] = useState(defaults.START_PAGE);
    const { post } = useActivePost();

    const spacesToMakeActive = post?.spaces ?? DEFAULT_SPACES;

    const onLoadMore = useCallback<NonNullable<LinkButtonProps["onClick"]>>((event) => {
        event.preventDefault();
        setPage(page + 1);
    }, [page]);

    const arg: GetAllMergedSpacesArg = {
        meta: {
            locationKey: location.key,
        },
        params: mapPagingQueryParams({ page }),
    };

    const { isLoadingSpaces, spaces, totalElements } = useGetAllMergedSpacesQuery(arg, {
        selectFromResult: ({ data, isLoading }) => ({
            isLoadingSpaces: isLoading,
            spaces: toSpaceList(data?.content ?? []),
            totalElements: data?.totalElements ?? 0,
        }),
    });

    allSpacesRef.current = useMemo(() => createSpaceValues([
        ...toActiveSpaceList(spacesToMakeActive),
        ...values.spaces,
        ...spaces,
    ]), [spacesToMakeActive, spaces, values.spaces]);

    useEffect(() => {
        setFieldValue("spaces", allSpacesRef.current, false);
    }, [setFieldValue, spaces.length]);

    const hasMore = spaces.length < totalElements;

    const toggleSpace = (space: Partial<Space>, index: number) => {
        const activeSpaces = pickActiveSpaces(values.spaces);
        const isCapped = !space.isActive && activeSpaces.length >= MAX_SPACE_COUNT;

        if (isCapped) {
            return;
        }

        const toggledSpace: Partial<Space> = {
            ...space,
            isActive: !space.isActive,
        };

        arrayHelpersRef.current?.replace(index, toggledSpace);
    };

    const footerText = `${t("posts.post.spaces.footer.text")}: ${MAX_SPACE_COUNT}.`;

    return (
        <DraftSpaceListStyled>
            <Skeleton isLoading={isLoadingSpaces} heightPx={22}>
                <FieldArray name="spaces">
                    {(helpers) => {
                        arrayHelpersRef.current = helpers;

                        return (
                            <ListStyled>
                                {!!values.spaces?.length && values.spaces.map((space, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <Fragment key={index}>
                                        {index === BLANK_SPACE_INDEX
                                            ? (
                                                <li>
                                                    <AppendSpaceField
                                                        index={index}
                                                        replace={helpers.replace}
                                                        unshift={helpers.unshift}
                                                    />
                                                </li>
                                            )
                                            : (
                                                <li>
                                                    <SpaceField
                                                        index={index}
                                                        space={space}
                                                        onClick={() => toggleSpace(space, index)}
                                                    />
                                                </li>
                                            )}
                                    </Fragment>
                                ))}

                                {hasMore && (
                                    <li>
                                        <LinkButton onClick={onLoadMore} view="plain">
                                            <Tag color="greyLighten">
                                                {t("spaces.list.actions.showMoreButton.title")}
                                            </Tag>
                                        </LinkButton>
                                    </li>
                                )}
                            </ListStyled>
                        );
                    }}
                </FieldArray>
            </Skeleton>

            <Typography fontSize="sm">{footerText}</Typography>
        </DraftSpaceListStyled>
    );
};
