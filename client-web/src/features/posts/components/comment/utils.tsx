import { useCallback, useMemo } from "react";
import { type LinkButtonProps } from "@eggziom/geek-regime-js-ui-kit";

import { PostCommentBase } from "@/features/posts/models/entities";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { useRootCommentContext } from "@/features/posts/contexts/root-comment";
import {
    useRemovePostCommentByIdMutation,
    useUpdatePostCommentByIdMutation,
} from "@/features/posts/services/post-comments-api";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { useTryAction } from "@/shared/utils/hooks/use-try-action";
import { getRemoveCommentKey, getUpdateCommentKey } from "@/features/posts/utils/api";

import { type PostCommentPending } from "../../types";

type UseCommentResult = {
    isAuthor: boolean;
    pending?: Extract<PostCommentPending, "update" | "remove">;
    removeButtonView: LinkButtonProps["view"];
    tryRemoveComment: () => void;
};

export const useComment = ({ item }: HasItem<MaybeStubItem<PostCommentBase>>): UseCommentResult => {
    const { profile } = useAuthContext();
    const { post } = useActivePost();
    const { rootCommentId } = useRootCommentContext();

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
        isAuthor: profile ? profile.id === item.author?.id : false,
        pending,
        removeButtonView: isTryRemoveModeOn ? "secondary" : "primary",
        tryRemoveComment,
    };
};
