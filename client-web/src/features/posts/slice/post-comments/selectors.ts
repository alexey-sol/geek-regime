import type { PostCommentsState } from "./slice";

import type { RootState } from "@/app/store";

export const selectPagingOptions = (state: RootState): PostCommentsState["pagingOptions"] =>
    state.postComments.pagingOptions;
