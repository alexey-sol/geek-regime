import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { PopupArg } from "@/features/feedback/models/entities";

export type FeedbackState = {
    popup?: PopupArg;
};

const initialState: FeedbackState = {
    popup: undefined,
};

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        resetPopup: (state) => {
            state.popup = initialState.popup;
        },
        setPopup: (state, action: PayloadAction<PopupArg>) => {
            feedbackSlice.actions.resetPopup();
            state.popup = action.payload;
        },
    },
});

export const { resetPopup, setPopup } = feedbackSlice.actions;

export const feedbackReducer = feedbackSlice.reducer;
