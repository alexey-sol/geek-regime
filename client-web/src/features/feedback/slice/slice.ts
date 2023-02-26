import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { NotificationArg } from "@/features/feedback/models/entities";

export type FeedbackState = {
    notification?: NotificationArg;
};

const initialState: FeedbackState = {
    notification: undefined,
};

export const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        resetNotification: (state) => {
            state.notification = initialState.notification;
        },
        setNotification: (state, action: PayloadAction<NotificationArg>) => {
            feedbackSlice.actions.resetNotification();
            state.notification = action.payload;
        },
    },
});

export const { resetNotification, setNotification } = feedbackSlice.actions;

export const feedbackReducer = feedbackSlice.reducer;
