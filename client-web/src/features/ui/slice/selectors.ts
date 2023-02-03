import type { RootState } from "@/app/store";
import type { UiState } from "@/features/ui/slice/slice";

export const selectPopup = (state: RootState): UiState["popup"] => state.ui.popup;
