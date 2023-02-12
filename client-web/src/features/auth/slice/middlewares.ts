import { createListenerMiddleware } from "@reduxjs/toolkit";
import { t } from "i18next";
import httpStatus from "http-status";

import { authApi } from "@/features/auth/services/api";
import { createFailurePopupArg, createSuccessPopupArg } from "@/features/ui/slice/utils";
import { hasHttpStatus } from "@/shared/utils/guards";
import { setPopup } from "@/features/ui/slice";

const { signIn, signUp } = authApi.endpoints;

const COMMON_ERROR_KEY = "common.query.error";

export const authListener = createListenerMiddleware();

authListener.startListening({
    matcher: signIn.matchRejected,
    effect: (action, listenerApi) => {
        const error = action.payload?.data;

        if (hasHttpStatus(error)) {
            const isForbidden = error.status === httpStatus.FORBIDDEN;
            const isNotFound = error.status === httpStatus.NOT_FOUND;

            const message = (isForbidden || isNotFound)
                ? t("signIn.query.forbiddenOrNotFoundError")
                : t(COMMON_ERROR_KEY);

            const arg = createFailurePopupArg(message);
            listenerApi.dispatch(setPopup(arg));
        }
    },
});

authListener.startListening({
    matcher: signUp.matchFulfilled,
    effect: (action, listenerApi) => {
        const arg = createSuccessPopupArg(t("signUp.query.success"));
        listenerApi.dispatch(setPopup(arg));
    },
});

authListener.startListening({
    matcher: signUp.matchRejected,
    effect: (action, listenerApi) => {
        const error = action.payload?.data;

        if (hasHttpStatus(error)) {
            const isConflict = error.status === httpStatus.CONFLICT;

            const message = (isConflict)
                ? t("signUp.query.emailAlreadyExistsError")
                : t(COMMON_ERROR_KEY);

            const arg = createFailurePopupArg(message);
            listenerApi.dispatch(setPopup(arg));
        }
    },
});
