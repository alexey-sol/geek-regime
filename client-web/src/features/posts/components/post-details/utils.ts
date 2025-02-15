import { useCallback, useMemo } from "react";
import { type LinkButtonProps } from "@eggziom/geek-regime-js-ui-kit";
import { useNavigate } from "react-router";

import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { useTryAction } from "@/shared/utils/hooks/use-try-action";
import { useRemovePostByIdMutation } from "@/features/posts/services/posts-api";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";

import { type PostDetailsPending } from "./types";

type UsePostDetailsResult = {
    pending?: PostDetailsPending;
    removeButtonView: LinkButtonProps["view"];
    tryRemovePost: () => void;
};

export const usePostDetails = (): UsePostDetailsResult => {
    const navigate = useNavigate();
    const { post } = useActivePost();

    const [removePostById, {
        isLoading: isLoadingRemove,
    }] = useRemovePostByIdMutation(); // TODO loader

    const removePost = useCallback(async () => {
        if (post) {
            try {
                await removePostById(post.id).unwrap();
                navigate(createAbsolutePostsPath());
            } catch (error: unknown) {
                console.error(error);
            }
        }
    }, [navigate, post, removePostById]);

    const {
        isTryModeOn: isTryRemoveModeOn,
        tryOnAction: tryRemovePost,
    } = useTryAction({ onAction: removePost });

    const pending = useMemo<PostDetailsPending | undefined>(() => {
        if (isLoadingRemove) {
            return "remove";
        }

        return undefined;
    }, [isLoadingRemove]);

    return {
        pending,
        removeButtonView: isTryRemoveModeOn ? "secondary" : "primary",
        tryRemovePost,
    };
};
