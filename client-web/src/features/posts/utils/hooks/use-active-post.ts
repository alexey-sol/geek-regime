import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/query";

import { toPostDetails } from "@/features/posts/utils/converters";
import {
    useCreatePostMutation,
    useGetPostBySlugQuery,
    useUpdatePostByIdMutation,
    useVoteOnPostMutation,
} from "@/features/posts/services/posts-api";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";

import { isCreatePostOnSaveArg } from "./utils";
import {
    type ActivePostPending,
    type CreatePostOnSaveArg,
    type UpdatePostOnSaveArg,
    type UseActivePostResult,
} from "./types";

const ONE_STEP_BACK = -1;

export const useActivePost = (): UseActivePostResult => {
    const navigate = useNavigate();
    const { slug } = useParams();

    const { profile } = useAuthContext();

    const resultOnGet = useGetPostBySlugQuery(slug ?? skipToken, {
        selectFromResult: ({ isFetching, data }) => ({
            isFetching,
            post: data && toPostDetails(data),
        }),
    });

    const [createPostMutation, resultOfCreate] = useCreatePostMutation();
    const [updatePostByIdMutation, resultOfUpdate] = useUpdatePostByIdMutation();
    const [voteOnPostMutation, resultOfVote] = useVoteOnPostMutation();

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

    function save(arg: CreatePostOnSaveArg, onSuccess?: () => void): void;
    function save(arg: UpdatePostOnSaveArg, onSuccess?: () => void): void;
    function save(arg: CreatePostOnSaveArg | UpdatePostOnSaveArg, onSuccess?: () => void): void {
        if (!profile) {
            // return;
        }

        const postExists = !!id;
        let result;

        if (postExists) {
            result = updatePostByIdMutation({ id, ...arg }).unwrap();
        } else if (!postExists && isCreatePostOnSaveArg(arg)) {
            result = createPostMutation({ spaceId: 1, authorId: 1, ...arg }).unwrap(); // TODO spaceId is hardcoded
        }

        result?.then(onSuccess).catch(console.error);
    }

    const savePost: UseActivePostResult["savePost"] = useCallback((arg, onSuccess) =>
        save(arg, onSuccess), [save]);

    const voteOnPost: UseActivePostResult["voteOnPost"] = useCallback((value) => {
        if (!profile || !id) {
            return; // TODO throw?
        }

        voteOnPostMutation({
            postId: id,
            userId: profile?.id,
            value,
        });
    }, [id, profile, voteOnPostMutation]);

    const pending = useMemo<ActivePostPending | undefined>(() => {
        if (isFetching) {
            return "get";
        } else if (resultOfCreate.isLoading) {
            return "create";
        } else if (resultOfUpdate.isLoading) {
            return "update";
        } else if (resultOfVote.isLoading) {
            return "vote";
        }

        return undefined;
    }, [isFetching, resultOfCreate.isLoading, resultOfUpdate.isLoading, resultOfVote.isLoading]);

    return useMemo(() => ({
        pending,
        post,
        savePost,
        voteOnPost,
    }), [pending, post, savePost, voteOnPost]);
};
