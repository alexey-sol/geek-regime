import React, {
    type FC, type PropsWithChildren, useCallback, useMemo,
} from "react";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { getUseContextOrThrowError } from "@/shared/utils/helpers/context";
import { useLazyGetPostCommentTreeByParentIdQuery } from "@/features/posts/services/post-comments-api";
import { toPostCommentTree } from "@/features/posts/utils/converters";
import { HasItem } from "@/shared/types";
import { type PostComment, type PostCommentTree } from "@/features/posts/models/entities";

export type RootCommentContextValue = {
    commentTree?: PostCommentTree;
    getReplies: () => void;
    rootCommentId: HasId["id"];
};

export const RootCommentContext = React.createContext<RootCommentContextValue | null>(null);

export const RootCommentContextProvider: FC<PropsWithChildren<HasItem<PostComment>>> = ({
    children,
    item,
}) => {
    const [getPostCommentTreeByParentId, { data }] = useLazyGetPostCommentTreeByParentIdQuery();

    const commentTree = useMemo(() => data && toPostCommentTree(data), [data]);

    const getReplies = useCallback(() => {
        getPostCommentTreeByParentId(item.id, true);
    }, [getPostCommentTreeByParentId, item.id]);

    const value = useMemo<RootCommentContextValue>(() => ({
        commentTree,
        getReplies,
        rootCommentId: item.id,
    }), [commentTree, getReplies, item]);

    return (
        <RootCommentContext.Provider value={value}>
            {children}
        </RootCommentContext.Provider>
    );
};

export const useRootCommentContext = getUseContextOrThrowError(RootCommentContext);
