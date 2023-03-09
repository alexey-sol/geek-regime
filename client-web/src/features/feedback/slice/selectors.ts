import type { RootState } from "@/app/store";
import type { FeedbackState } from "@/features/feedback/slice/slice";

export const selectSnackbar = (state: RootState): FeedbackState["snackbar"] =>
    state.feedback.snackbar;
