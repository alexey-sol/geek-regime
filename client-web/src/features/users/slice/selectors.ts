import type { UsersState } from "./slice";

import type { RootState } from "@/app/store";

export const selectPagingOptions = (state: RootState): UsersState["pagingOptions"] =>
    state.users.pagingOptions;
