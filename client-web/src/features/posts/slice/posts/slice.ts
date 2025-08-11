import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_PAGING_OPTIONS } from "@/shared/const";
import type { PagingOptions } from "@/shared/types";

export type PostsState = {
    pagingOptions: PagingOptions;
};

const initialState: PostsState = {
    pagingOptions: { ...DEFAULT_PAGING_OPTIONS },
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPagingOptions: (state, action: PayloadAction<Partial<PagingOptions>>) => {
            state.pagingOptions = {
                ...state.pagingOptions,
                ...action.payload,
            };
        },
    },
});

export const { setPagingOptions } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
