import type { RootState } from "@/app/store";
import type { FeedbackState } from "@/features/feedback/slice/slice";

export const selectNotification = (state: RootState): FeedbackState["notification"] =>
    state.feedback.notification;
