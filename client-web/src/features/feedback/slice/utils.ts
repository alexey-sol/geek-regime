import type { NotificationArg } from "@/features/feedback/models/entities";

type CreateNotificationArg = (message: NotificationArg["message"]) => NotificationArg;

export const createSuccessNotificationArg: CreateNotificationArg = (message) => ({
    message,
    view: "success",
});

export const createFailureNotificationArg: CreateNotificationArg = (message) => ({
    message,
    view: "failure",
});

export const createWarningNotificationArg: CreateNotificationArg = (message) => ({
    message,
    view: "warning",
});
