import { createListenerMiddleware } from "@reduxjs/toolkit";
import { t } from "i18next";
import httpStatus from "http-status";

import { authApi } from "@/features/auth/services/api";
import { hasHttpStatus } from "@/shared/utils/guards";
import { setPopup } from "@/features/ui/slice";
import type { PopupArg } from "@/features/ui/models/entities";

const { signIn, signUp } = authApi.endpoints;

export const authListener = createListenerMiddleware();

authListener.startListening({
    matcher: signIn.matchRejected,
    effect: (action, listenerApi) => {
        const error = action.payload?.data;

        if (hasHttpStatus(error)) {
            const isForbidden = error.status === httpStatus.FORBIDDEN;
            const isNotFound = error.status === httpStatus.NOT_FOUND;

            const popupArg: PopupArg = (isForbidden || isNotFound)
                ? {
                    message: t("signIn.query.notFoundOrForbiddenError"),
                    view: "failure",
                }
                : {
                    message: t("common.query.unknownError"),
                    view: "failure",
                };

            listenerApi.dispatch(setPopup(popupArg));
        }
    },
});

authListener.startListening({
    matcher: signUp.matchFulfilled,
    effect: (action, listenerApi) => {
        listenerApi.dispatch(setPopup({
            message: t("signUp.query.success"),
            view: "success",
        }));
    },
});

authListener.startListening({
    matcher: signUp.matchRejected,
    effect: (action, listenerApi) => {
        const error = action.payload?.data;

        if (hasHttpStatus(error)) {
            const popupArg: PopupArg = (error.status === httpStatus.CONFLICT)
                ? {
                    message: t("signUp.query.emailAlreadyExistsError"),
                    view: "failure",
                }
                : {
                    message: t("common.query.unknownError"),
                    view: "failure",
                };

            listenerApi.dispatch(setPopup(popupArg));
        }
    },
});
