import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";

import { createFailureSnackbarArg } from "@/features/feedback/slice/utils";
import { setSnackbar } from "@/features/feedback/slice";
import {
    hasData,
    isApiError,
    isFailureNotificationDisabled,
} from "@/shared/utils/guards";
import { getErrorMessage } from "@/shared/utils/api";

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

        const error = action.payload.data;
        const { arg } = action.meta;

        if (isFailureNotificationDisabled(arg, error.status)) {
            return;
        }

        const message = getErrorMessage(error);

        listenerApi.dispatch(setSnackbar(createFailureSnackbarArg(message)));
    },
});
