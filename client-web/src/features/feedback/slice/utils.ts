import type { SnackbarArg } from "@/features/feedback/models/entities";

type CreateSnackbarArg = (message: SnackbarArg["message"]) => SnackbarArg;

export const createSuccessSnackbarArg: CreateSnackbarArg = (message) => ({
    message,
    view: "success",
});

export const createFailureSnackbarArg: CreateSnackbarArg = (message) => ({
    message,
    view: "failure",
});

export const createWarningSnackbarArg: CreateSnackbarArg = (message) => ({
    message,
    view: "warning",
});
