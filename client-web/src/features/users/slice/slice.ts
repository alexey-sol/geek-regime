import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_PAGING_OPTIONS } from "@/shared/const";
import type { PagingOptions } from "@/shared/types";

export type UsersState = {
    pagingOptions: PagingOptions;
};

const initialState: UsersState = {
    pagingOptions: { ...DEFAULT_PAGING_OPTIONS },
};

export const usersSlice = createSlice({
    name: "users",
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

export const { setPagingOptions } = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
