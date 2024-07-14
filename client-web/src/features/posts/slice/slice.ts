import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { defaults } from "@/shared/const";
import type { PagingOptions } from "@/shared/models/entities";

export type PostsState = {
    pagingOptions: PagingOptions;
};

const initialState: PostsState = {
    pagingOptions: {
        page: defaults.PAGING_PAGE,
        size: defaults.PAGING_SIZE,
        totalElements: 0,
    },
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
