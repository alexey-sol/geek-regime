import { useCallback, useMemo } from "react";
import { type LinkButtonProps } from "@eggziom/geek-regime-js-ui-kit/components/button";
import { useTryAction } from "@eggziom/geek-regime-js-ui-kit/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { type PostDetailsPending } from "./types";

import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { useRemovePostByIdMutation } from "@/features/posts/services/posts-api";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { useAppDispatch } from "@/app/store/hooks";
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";

type UsePostDetailsResult = {
    pending?: PostDetailsPending;
    removeButtonView: LinkButtonProps["view"];
    tryRemovePost: () => void;
};

export const usePostDetails = (): UsePostDetailsResult => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { post } = useActivePost();

    const [removePostById, {
        isLoading: isLoadingRemove,
    }] = useRemovePostByIdMutation(); // TODO loader

    const removePost = useCallback(async () => {
        if (post) {
            try {
                await removePostById(post.id).unwrap();
                dispatch(notify(createSuccessSnackbarArg(t("posts.query.remove.success"))));
                navigate(createAbsolutePostsPath());
            } catch (error: unknown) {
                console.error(error);
            }
        }
    }, [dispatch, navigate, post, removePostById, t]);

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
