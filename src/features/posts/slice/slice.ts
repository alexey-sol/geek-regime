import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaults } from "@/shared/const";
import type{ PagingOptions } from "@/shared/types/models";

export type PostsState = {
    pagingOptions: PagingOptions;
};

const initialState: PostsState = {
    pagingOptions: {
        page: defaults.PAGING_PAGE,
        size: defaults.PAGING_SIZE,
        totalItems: 0,
    },
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPagingOptions: (state, {
            payload: options,
        }: PayloadAction<Partial<PagingOptions>>) => {
            state.pagingOptions = {
                ...state.pagingOptions,
                ...options,
            };
        },
    },
});

export const { setPagingOptions } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
