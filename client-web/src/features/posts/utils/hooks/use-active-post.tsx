import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";

import { toUserPostDetails } from "@/features/posts/utils/converters";
import {
    useCreatePostMutation,
    useGetPostBySlugQuery,
    useUpdatePostByIdMutation,
} from "@/features/posts/services/api";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";

import { isCreatePostOnSaveArg } from "./utils";
import type {
    ActivePostPending, CreatePostOnSaveArg, UpdatePostOnSaveArg, UseActivePostResult,
} from "./types";

const ONE_STEP_BACK = -1;

export const useActivePost = (): UseActivePostResult => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const { profile } = useAuthContext();

    const resultOnGet = useGetPostBySlugQuery(slug ?? skipToken, {
        selectFromResult: ({ isFetching, data }) => ({
            isFetching,
            post: data && toUserPostDetails(data),
        }),
    });

    const [createPost, resultOfCreate] = useCreatePostMutation();
    const [updatePostById, resultOfUpdate] = useUpdatePostByIdMutation();

    const slugAfterSaving = resultOfUpdate?.data?.slug ?? resultOfCreate?.data?.slug;

    useEffect(() => {
        const navigateToDetails = () => {
            const hasNewSlug = slugAfterSaving && slugAfterSaving !== slug;

            if (hasNewSlug) {
                navigate(createAbsolutePostsPath(slugAfterSaving));
            } else {
                navigate(ONE_STEP_BACK);
            }
        };

        if (slugAfterSaving) {
            navigateToDetails();
            // TODO + show success notification
        }
    }, [navigate, slugAfterSaving, slug]);

    const { isFetching, post } = resultOnGet;
    const id = post?.id;

    function save(arg: CreatePostOnSaveArg): void;
    function save(arg: UpdatePostOnSaveArg): void;
    function save(arg: CreatePostOnSaveArg | UpdatePostOnSaveArg): void {
        if (!profile) {
            return;
        }

        const postExists = !!id;

        if (postExists) {
            updatePostById({ id, ...arg });
        } else if (!postExists && isCreatePostOnSaveArg(arg)) {
            createPost({ spaceId: 1, authorId: profile.id, ...arg }); // TODO spaceId is hardcoded
        }
    }

    const savePost = useCallback((arg: CreatePostOnSaveArg | UpdatePostOnSaveArg) =>
        save(arg), [save]);

    const pending = useMemo<ActivePostPending | undefined>(() => {
        if (isFetching) {
            return "get";
        } else if (resultOfCreate.isLoading) {
            return "create";
        } else if (resultOfUpdate.isLoading) {
            return "update";
        }

        return undefined;
    }, [isFetching, resultOfCreate.isLoading, resultOfUpdate.isLoading]);

    return useMemo(() => ({
        pending,
        post,
        savePost,
    }), [pending, post, savePost]);
};
