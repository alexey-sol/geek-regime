import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";

import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import {
    useCreatePostMutation,
    useGetPostBySlugQuery,
    useUpdatePostByIdMutation,
} from "@/features/posts/services/api";

import { isCreatePostOnSaveArg } from "./utils";
import type { CreatePostOnSaveArg, UpdatePostOnSaveArg, UseActivePostResult } from "./types";

export const useActivePost = (): UseActivePostResult => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const { data, isFetching } = useGetPostBySlugQuery(slug ?? skipToken);
    const [createPost, resultOfCreate] = useCreatePostMutation();
    const [updatePostById, resultOfUpdate] = useUpdatePostByIdMutation();

    const slugAfterSaving = resultOfUpdate?.data?.slug ?? resultOfCreate?.data?.slug;

    useEffect(() => {
        const navigateToDetails = () => {
            const hasNewSlug = slugAfterSaving !== slug;

            if (hasNewSlug) {
                navigate(`/posts/${slugAfterSaving}`);
            } else {
                navigate(-1);
            }
        };

        if (slugAfterSaving) {
            navigateToDetails();
            // TODO + show success notification
        }
    }, [navigate, slugAfterSaving, slug]);

    const post = useMemo(() => data && fromPostDtoToEntity(data), [data]);
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
