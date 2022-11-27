import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/features/users/models/entities";

export type SessionState = {
    user?: User;
};

const initialState: SessionState = {
    user: undefined,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser: (state, {
            payload: user
        }: PayloadAction<User>) => {
            state.user = user;
        },
    },
});

export const { setUser } = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
