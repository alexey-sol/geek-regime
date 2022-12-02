import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";

import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import {
    useCreatePostMutation,
    useGetPostBySlugQuery,
    useUpdatePostByIdMutation,
} from "@/features/posts/services/api";

import { getPathToDetails, isCreatePostOnSaveArg } from "./utils";
import type { CreatePostOnSaveArg, UpdatePostOnSaveArg, UseActivePostResult } from "./types";

const ONE_STEP_BACK = -1;

export const useActivePost = (): UseActivePostResult => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const { isFetching, post } = useGetPostBySlugQuery(slug ?? skipToken, {
        selectFromResult: (result) => ({
            isFetching: result.isFetching,
            post: result.data && fromPostDtoToEntity(result.data),
        }),
    });

    const [createPost, resultOfCreate] = useCreatePostMutation();
    const [updatePostById, resultOfUpdate] = useUpdatePostByIdMutation();

    const slugAfterSaving = resultOfUpdate?.data?.slug ?? resultOfCreate?.data?.slug;

    useEffect(() => {
        const navigateToDetails = () => {
            const hasNewSlug = slugAfterSaving && slugAfterSaving !== slug;

            if (hasNewSlug) {
                navigate(getPathToDetails(slugAfterSaving));
            } else {
                navigate(ONE_STEP_BACK);
            }
        };

        if (slugAfterSaving) {
            navigateToDetails();
            // TODO + show success notification
        }
    }, [navigate, slugAfterSaving, slug]);

    const id = post?.id;

    function save(arg: CreatePostOnSaveArg): void;
    function save(arg: UpdatePostOnSaveArg): void;
    function save(arg: CreatePostOnSaveArg | UpdatePostOnSaveArg): void {
        const postExists = id;

        if (postExists) {
            updatePostById({ id, ...arg });
        } else if (!postExists && isCreatePostOnSaveArg(arg)) {
            createPost({ spaceId: 1, userId: 1, ...arg }); // TODO hardcoded
        }
    }

    const savePost = useCallback((arg: CreatePostOnSaveArg | UpdatePostOnSaveArg) =>
        save(arg), [save]);

    const isPending = isFetching || resultOfCreate.isLoading || resultOfUpdate.isLoading;

    return useMemo(() => ({
        isPending,
        post,
        savePost,
    }), [isPending, post, savePost]);
};
