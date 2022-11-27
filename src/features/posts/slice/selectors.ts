import type { RootState } from "@/app/store";
import type { PagingOptions } from "@/shared/types/models";

export const getPagingOptions = (state: RootState): PagingOptions =>
    state.posts.pagingOptions;
