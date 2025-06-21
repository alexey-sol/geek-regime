import React, {
    type FC, type PropsWithChildren, useCallback, useMemo,
} from "react";

import { getUseContextOrThrowError } from "@/shared/utils/helpers/context";
import { useLazyGetPostCommentTreeByParentIdQuery } from "@/features/posts/services/post-comments-api";
import { toPostCommentTree } from "@/features/posts/utils/converters";
import { type HasItem, type MaybeStubItem } from "@/shared/types";
import { type PostComment, type PostCommentTree } from "@/features/posts/models/entities";

import { type PostCommentPending } from "../types";

type RootCommentContextProviderProps = PropsWithChildren<HasItem<MaybeStubItem<PostComment>>>;

export type RootCommentContextValue = {
    commentTree?: PostCommentTree;
    getReplies: () => void;
    pending?: Extract<PostCommentPending, "getReplies">;
    rootComment: MaybeStubItem<PostComment>;
};

export const RootCommentContext = React.createContext<RootCommentContextValue | null>(null);

export const RootCommentContextProvider: FC<RootCommentContextProviderProps> = ({
    children,
    item,
}) => {
    const [
        getPostCommentTreeByParentId,
        { data, isLoading },
    ] = useLazyGetPostCommentTreeByParentIdQuery();

    const commentTree = useMemo(() => data && toPostCommentTree(data), [data]);

    const getReplies = useCallback(() => {
        getPostCommentTreeByParentId(item.id, true);
    }, [getPostCommentTreeByParentId, item.id]);

    const pending = useMemo<RootCommentContextValue["pending"]>(() => {
        if (isLoading) {
            return "getReplies";
        }

        return undefined;
    }, [isLoading]);

    const value = useMemo<RootCommentContextValue>(() => ({
        commentTree,
        getReplies,
        pending,
        rootComment: item,
    }), [commentTree, getReplies, item, pending]);

    return (
        <RootCommentContext.Provider value={value}>
            {children}
        </RootCommentContext.Provider>
    );
};

export const useRootCommentContext = getUseContextOrThrowError(RootCommentContext);
