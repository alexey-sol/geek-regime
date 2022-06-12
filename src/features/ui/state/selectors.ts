import { RootState } from "@store";
import { UiPending } from "@/features/ui/state/slice.types";

export const selectPending = (state: RootState): UiPending => state.ui.pending;
