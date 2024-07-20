import type { RootState } from "@/app/store";

import type { UsersState } from "./slice";

export const selectPagingOptions = (state: RootState): UsersState["pagingOptions"] =>
    state.users.pagingOptions;
