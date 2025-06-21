import type { RootState } from "@/app/store";

import type { PostCommentsState } from "./slice";

export const selectPagingOptions = (state: RootState): PostCommentsState["pagingOptions"] =>
    state.postComments.pagingOptions;
