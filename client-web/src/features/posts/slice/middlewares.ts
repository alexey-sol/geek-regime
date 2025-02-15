import { createListenerMiddleware } from "@reduxjs/toolkit";
import { t } from "i18next";

import { postsApi } from "@/features/posts/services/posts-api";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { setSnackbar } from "@/features/feedback/slice";

const { removePostById } = postsApi.endpoints;

export const postsListener = createListenerMiddleware();

postsListener.startListening({
    matcher: removePostById.matchFulfilled,
    effect: (action, listenerApi) => {
        const arg = createSuccessSnackbarArg(t("posts.post.query.mutation.success"));
        listenerApi.dispatch(setSnackbar(arg));
    },
});
