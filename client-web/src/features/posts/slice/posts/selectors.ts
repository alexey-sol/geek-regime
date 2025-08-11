import type { PostsState } from "./slice";

import type { RootState } from "@/app/store";

export const selectPagingOptions = (state: RootState): PostsState["pagingOptions"] =>
    state.posts.pagingOptions;
