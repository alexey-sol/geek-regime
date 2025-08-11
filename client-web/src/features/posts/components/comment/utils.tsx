import { useCallback, useMemo } from "react";
import { type LinkButtonProps } from "@eggziom/geek-regime-js-ui-kit/components/button";
import { useTryAction } from "@eggziom/geek-regime-js-ui-kit/utils";

import { type PostCommentPending } from "../../types";

import { type PostCommentBase } from "@/features/posts/models/entities";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import {
    useRemovePostCommentByIdMutation,
    useUpdatePostCommentByIdMutation,
} from "@/features/posts/services/post-comments-api";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { getRemoveCommentKey, getUpdateCommentKey } from "@/features/posts/utils/api";
import { IllegalArgumentError } from "@/shared/utils/errors";

type UseCommentResult = {
    isAuthor: boolean;
    pending?: Extract<PostCommentPending, "update" | "remove">;
    removeButtonView: LinkButtonProps["view"];
    tryRemoveComment: () => void;
};

export const useComment = ({ item }: HasItem<MaybeStubItem<PostCommentBase>>): UseCommentResult => {
    const { profile } = useAuthContext();
    const { post } = useActivePost();
    const { rootComment } = useRootCommentContext();

    const [, { isLoading: isLoadingUpdate }] = useUpdatePostCommentByIdMutation({
        fixedCacheKey: getUpdateCommentKey(item.id),
    });

    const [removePostCommentById, {
        isLoading: isLoadingRemove,
    }] = useRemovePostCommentByIdMutation({
        fixedCacheKey: getRemoveCommentKey(item.id),
    });

    const deleteComment = useCallback(() => {
        if (!post) {
            throw new IllegalArgumentError("Post is required");
        }

        removePostCommentById({
            id: item.id,
            meta: {
                postId: post.id,
                postSlug: post.slug,
                rootCommentId: rootComment.id,
            },
        });
    }, [item.id, post, removePostCommentById, rootComment.id]);

    const {
        isTryModeOn: isTryRemoveModeOn,
        tryOnAction: tryRemoveComment,
    } = useTryAction({ onAction: deleteComment });

    const pending = useMemo<UseCommentResult["pending"]>(() => {
        if (isLoadingRemove) {
            return "remove";
        } else if (isLoadingUpdate) {
            return "update";
        }

        return undefined;
    }, [isLoadingRemove, isLoadingUpdate]);

    return {
        isAuthor: item.isAuthor?.(profile) ?? false,
        pending,
        removeButtonView: isTryRemoveModeOn ? "secondary" : "primary",
        tryRemoveComment,
    };
};
