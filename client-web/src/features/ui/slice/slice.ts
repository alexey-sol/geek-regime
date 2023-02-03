import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { PopupArg } from "@/features/ui/models/entities";

export type UiState = {
    popup?: PopupArg;
};

const initialState: UiState = {
    popup: undefined,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        resetPopup: (state) => {
            state.popup = initialState.popup;
        },
        setPopup: (state, {
            payload: popup,
        }: PayloadAction<PopupArg>) => {
            state.popup = popup;
        },
    },
});

export const { resetPopup, setPopup } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
