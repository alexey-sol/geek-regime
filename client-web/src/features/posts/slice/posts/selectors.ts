import type { RootState } from "@/app/store";

import type { PostsState } from "../slice";

export const selectPagingOptions = (state: RootState): PostsState["pagingOptions"] =>
    state.posts.pagingOptions;
