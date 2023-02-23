import type { RootState } from "@/app/store";
import type { PostsState } from "@/features/posts/slice/slice";

export const selectPagingOptions = (state: RootState): PostsState["pagingOptions"] =>
    state.posts.pagingOptions;
