import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UiPending, UiState } from "./slice.types";

const initialPending: UiPending = {
    categories: false,
    pages: false,
    spaces: false,
};

const initialState: UiState = {
    pending: initialPending,
};

export const slice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setPending: (state, action: PayloadAction<Partial<UiPending>>) => {
            state.pending = {
                ...state.pending,
                ...action.payload,
            };
        },
    },
});

export const { setPending } = slice.actions;
export const uiReducer = slice.reducer;
