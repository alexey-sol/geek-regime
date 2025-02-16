import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";
import { t } from "i18next";

import { createFailureSnackbarArg } from "@/features/feedback/slice/utils";
import { setSnackbar } from "@/features/feedback/slice";
import {
    hasData,
    isApiError,
    isApiErrorDetail,
    isFailureNotificationDisabled,
} from "@/shared/utils/guards";

import { notify } from "../actions";

export const appListener = createListenerMiddleware();

appListener.startListening({
    actionCreator: notify,
    effect: (action, listenerApi) => {
        listenerApi.dispatch(setSnackbar(action.payload));
    },
});

appListener.startListening({
    matcher: isRejected,
    effect: (action, listenerApi) => {
        if (!hasData(action.payload) || !isApiError(action.payload.data)) {
            return;
        }

        const { details, resource, status } = action.payload.data;
        const { arg } = action.meta;

        if (isFailureNotificationDisabled(arg, status)) {
            return;
        }

        const messages = resource
            ? details.filter(isApiErrorDetail)
                .map(({ field, code }) => t(`shared.query.error.${resource}.${field}.${code}`))
                .filter(Boolean)
            : [];

        const concatenatedMessage = messages.length
            ? messages.join(", ")
            : t("shared.query.error.defaultMessage");

        listenerApi.dispatch(setSnackbar(createFailureSnackbarArg(concatenatedMessage)));
    },
});
