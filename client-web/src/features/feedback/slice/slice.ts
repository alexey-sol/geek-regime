import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { SnackbarArg } from "@/features/feedback/models/entities";

export type FeedbackState = {
    snackbar?: SnackbarArg;
};

const initialState: FeedbackState = {
    snackbar: undefined,
};

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        resetSnackbar: (state) => {
            state.snackbar = initialState.snackbar;
        },
        setSnackbar: (state, action: PayloadAction<SnackbarArg>) => {
            feedbackSlice.actions.resetSnackbar();
            state.snackbar = action.payload;
        },
    },
});

export const { resetSnackbar, setSnackbar } = feedbackSlice.actions;

export const feedbackReducer = feedbackSlice.reducer;
