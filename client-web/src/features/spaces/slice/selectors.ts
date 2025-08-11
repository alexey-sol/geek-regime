import type { SpacesState } from "./slice";

import type { RootState } from "@/app/store";

export const selectPagingOptions = (state: RootState): SpacesState["pagingOptions"] =>
    state.spaces.pagingOptions;
