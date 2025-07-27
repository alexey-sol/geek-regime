import { useCallback, useEffect, useState } from "react";
import { PubSub } from "@eggziom/geek-regime-js-ui-kit";

import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";

import { type UseCommentBoxArg } from "./types";

type CommentMode = "reply" | "edit";

const CLOSE_COMMENT_BOX = "CLOSE_COMMENT_BOX";

const pubSub = new PubSub();

export const useCommentBox = ({
    body: initialBody = "",
    onSubmit,
}: UseCommentBoxArg = {}) => {
    const [body, setBody] = useState(initialBody);
    const { post } = useActivePost();
    const [commentMode, setCommentMode] = useState<CommentMode>();

    const openReplyBox = useCallback(() => {
        pubSub.publish(CLOSE_COMMENT_BOX);
        setCommentMode("reply");
    }, []);

    const openEditBox = useCallback(() => {
        pubSub.publish(CLOSE_COMMENT_BOX);
        setCommentMode("edit");
    }, []);

    const closeBox = useCallback(() => setCommentMode(undefined), []);

    useEffect(() => {
        pubSub.subscribe(CLOSE_COMMENT_BOX, closeBox);

        return () => {
            pubSub.unsubscribe(CLOSE_COMMENT_BOX, closeBox);
        };
    }, [closeBox]);

    const onReplySuccess = useCallback(() => {
        onSubmit?.();
        closeBox();
    }, [closeBox, onSubmit]);

    return {
        body,
        closeBox,
        commentMode,
        onEditSuccess: closeBox,
        onReplySuccess,
        openEditBox,
        openReplyBox,
        post,
        setBody,
        showEditBox: commentMode === "edit",
        showReplyBox: commentMode === "reply",
    };
};
