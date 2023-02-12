import { PopupArg } from "@/features/ui/models/entities";

export const createSuccessPopupArg = (message: PopupArg["message"]): PopupArg => ({
    message,
    view: "success",
});

export const createFailurePopupArg = (message: PopupArg["message"]): PopupArg => ({
    message,
    view: "failure",
});

export const createWarningPopupArg = (message: PopupArg["message"]): PopupArg => ({
    message,
    view: "warning",
});
