import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_PAGING_OPTIONS } from "@/shared/const";
import type { PagingOptions } from "@/shared/types";

export type SpacesState = {
    pagingOptions: PagingOptions;
};

const initialState: SpacesState = {
    pagingOptions: { ...DEFAULT_PAGING_OPTIONS },
};

export const spacesSlice = createSlice({
    name: "spaces",
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

export const { setPagingOptions } = spacesSlice.actions;

export const spacesReducer = spacesSlice.reducer;
