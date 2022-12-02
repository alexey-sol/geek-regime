import type { PagingOptions } from "@/shared/models/entities";
import type { RootState } from "@/app/store";

export const selectPagingOptions = (state: RootState): PagingOptions =>
    state.posts.pagingOptions;
