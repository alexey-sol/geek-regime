import type { RootState } from "@/app/store";

import type { SpacesState } from "./slice";

export const selectPagingOptions = (state: RootState): SpacesState["pagingOptions"] =>
    state.spaces.pagingOptions;
