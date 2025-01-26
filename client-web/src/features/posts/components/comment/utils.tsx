import { useCallback, useMemo } from "react";
import { type LinkButtonProps } from "@eggziom/geek-regime-js-ui-kit";

import { PostCommentBase } from "@/features/posts/models/entities";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import {
    useRemovePostCommentByIdMutation,
    useUpdatePostCommentByIdMutation,
} from "@/features/posts/services/post-comments-api";
import { useToggle } from "@/shared/utils/hooks/use-toggle";
import { useTimeout } from "@/shared/utils/hooks/use-timeout";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { type HasItem } from "@/shared/types";
import * as postsCn from "@/features/posts/const";

import { type PostCommentPending } from "./types";
import * as cn from "./const";

type UseCommentResult = {
    isAuthor: boolean;
    pending?: PostCommentPending;
    removeButtonView: LinkButtonProps["view"];
    tryRemoveComment: () => void;
};

export const useComment = ({ item }: HasItem<PostCommentBase>): UseCommentResult => {
    const { profile } = useAuthContext();
    const { post } = useActivePost();
    const { rootCommentId } = useRootCommentContext();

    const [, { isLoading: isLoadingUpdate }] = useUpdatePostCommentByIdMutation({
        fixedCacheKey: postsCn.UPDATE_COMMENT_KEY,
    }); // TODO loader

    const [removePostCommentById, {
        isLoading: isLoadingRemove,
    }] = useRemovePostCommentByIdMutation({
        fixedCacheKey: postsCn.REMOVE_COMMENT_KEY,
    }); // TODO loader

    const {
        isOn: isRemoveModeOn,
        off: disableRemoveMode,
        on: enableRemoveMode,
    } = useToggle();

    useTimeout({
        durationMs: cn.REMOVE_MODE_DURATION_MS,
        onTimeout: disableRemoveMode,
        skipTimeout: !isRemoveModeOn,
    });

    const deleteComment = useCallback(() => {
        if (!post) {
            return;
        }

        removePostCommentById({
            id: item.id,
            meta: {
                postId: post.id,
                postSlug: post.slug,
                rootCommentId,
            },
        });
    }, [item.id, post, removePostCommentById, rootCommentId]);

    const pending = useMemo<PostCommentPending | undefined>(() => {
        if (isLoadingRemove) {
            return "remove";
        } else if (isLoadingUpdate) {
            return "update";
        }

        return undefined;
    }, [isLoadingRemove, isLoadingUpdate]);

    return {
        isAuthor: profile ? profile.id === item.author.id : false,
        pending,
        removeButtonView: isRemoveModeOn ? "secondary" : "primary",
        tryRemoveComment: isRemoveModeOn ? deleteComment : enableRemoveMode,
    };
};
