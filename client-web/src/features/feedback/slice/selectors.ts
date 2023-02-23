import type { RootState } from "@/app/store";
import type { FeedbackState } from "@/features/feedback/slice/slice";

export const selectPopup = (state: RootState): FeedbackState["popup"] =>
    state.feedback.popup;
