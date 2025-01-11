import React, { useCallback, useEffect, useMemo } from "react";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { useActivePost } from "@/features/posts/utils/hooks/use-active-post";
import { useToggle } from "@/shared/utils/hooks/use-toggle";
import { ReplyBox, ReplyBoxProps } from "@/features/posts/components/reply-box/reply-box";
import { PubSub } from "@/shared/utils/pub-sub";

type UseReplyBoxArg = Pick<ReplyBoxProps, "onSubmit" | "parentId" | "rootCommentId" | "title">;

type UseReplyBoxResult = {
    closeReplyBox: () => void;
    openReplyBox: () => void;
    replyBoxIfAvailable?: JSX.Element;
    showReplyBox: boolean;
};

const CLOSE_REPLY_BOX = "CLOSE_REPLY_BOX";

const pubSub = new PubSub();

export const useReplyBox = ({ onSubmit, ...rest }: UseReplyBoxArg = {}): UseReplyBoxResult => {
    const { profile } = useAuthContext();
    const { post } = useActivePost();
    const { isOn, off, on } = useToggle();

    const openReplyBox = useCallback(() => {
        pubSub.publish(CLOSE_REPLY_BOX);
        on();
    }, [on]);

    const handleSubmit = useCallback(() => {
        onSubmit?.();
        off();
    }, [off, onSubmit]);

    useEffect(() => {
        pubSub.subscribe(CLOSE_REPLY_BOX, off);

        return () => {
            pubSub.unsubscribe(CLOSE_REPLY_BOX, off);
        };
    }, [off]);

    const replyBoxIfAvailable = useMemo(() => post && ( // TODO check profile as well
        <ReplyBox
            authorId={profile?.id ?? 1} // TODO hardcoded
            onClose={off}
            onSubmit={handleSubmit}
            postId={post.id}
            {...rest}
        />
    ), [rest, handleSubmit, off, post, profile?.id]);

    return {
        closeReplyBox: off,
        openReplyBox,
        replyBoxIfAvailable,
        showReplyBox: isOn,
    };
};
