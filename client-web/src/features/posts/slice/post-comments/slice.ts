import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_PAGING_OPTIONS } from "@/shared/const";
import type { PagingOptions } from "@/shared/types";

export type PostCommentsState = {
    pagingOptions: PagingOptions;
};

const initialState: PostCommentsState = {
    pagingOptions: { ...DEFAULT_PAGING_OPTIONS },
};

export const postCommentsSlice = createSlice({
    name: "postComments",
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

export const { setPagingOptions } = postCommentsSlice.actions;

export const postCommentsReducer = postCommentsSlice.reducer;
