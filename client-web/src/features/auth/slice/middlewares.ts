import { createListenerMiddleware } from "@reduxjs/toolkit";
import { t } from "i18next";
import httpStatus from "http-status";

import { authApi } from "@/features/auth/services/api";
import {
    createFailureNotificationArg,
    createSuccessNotificationArg,
} from "@/features/feedback/slice/utils";
import { hasHttpStatus } from "@/shared/utils/guards";
import { setNotification } from "@/features/feedback/slice";

const { signIn, signUp } = authApi.endpoints;

const COMMON_ERROR_KEY = "shared.query.error";

export const authListener = createListenerMiddleware();

authListener.startListening({
    matcher: signIn.matchRejected,
    effect: (action, listenerApi) => {
        const error = action.payload?.data;

        if (hasHttpStatus(error)) {
            const isForbidden = error.status === httpStatus.FORBIDDEN;
            const isNotFound = error.status === httpStatus.NOT_FOUND;

            const message = (isForbidden || isNotFound)
                ? t("auth.signIn.query.forbiddenOrNotFoundError")
                : t(COMMON_ERROR_KEY);

            const arg = createFailureNotificationArg(message);
            listenerApi.dispatch(setNotification(arg));
        }
    },
});

authListener.startListening({
    matcher: signUp.matchFulfilled,
    effect: (action, listenerApi) => {
        const arg = createSuccessNotificationArg(t("auth.signUp.query.success"));
        listenerApi.dispatch(setNotification(arg));
    },
});

authListener.startListening({
    matcher: signUp.matchRejected,
    effect: (action, listenerApi) => {
        const error = action.payload?.data;

        if (hasHttpStatus(error)) {
            const isConflict = error.status === httpStatus.CONFLICT;

            const message = (isConflict)
                ? t("auth.signUp.query.emailAlreadyExistsError")
                : t(COMMON_ERROR_KEY);

            const arg = createFailureNotificationArg(message);
            listenerApi.dispatch(setNotification(arg));
        }
    },
});
