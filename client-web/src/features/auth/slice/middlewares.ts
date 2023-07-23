import { createListenerMiddleware } from "@reduxjs/toolkit";
import { t } from "i18next";
import httpStatus from "http-status";
import { hasHttpStatus } from "@eggziom/geek-regime-js-commons";

import { authApi } from "@/features/auth/services/api";
import {
    createFailureSnackbarArg,
    createSuccessSnackbarArg,
} from "@/features/feedback/slice/utils";
import { setSnackbar } from "@/features/feedback/slice";

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

            const arg = createFailureSnackbarArg(message);
            listenerApi.dispatch(setSnackbar(arg));
        }
    },
});

authListener.startListening({
    matcher: signUp.matchFulfilled,
    effect: (action, listenerApi) => {
        const arg = createSuccessSnackbarArg(t("auth.signUp.query.success"));
        listenerApi.dispatch(setSnackbar(arg));
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

            const arg = createFailureSnackbarArg(message);
            listenerApi.dispatch(setSnackbar(arg));
        }
    },
});
