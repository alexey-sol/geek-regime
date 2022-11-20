import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/features/users/models/entities";

import type { SessionState } from "./types";

const initialState: SessionState = {
    user: undefined,
};

export const slice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setUser: (state, { payload: user }: PayloadAction<User>) => {
            state.user = user;
        },
    },
});

export const { setUser } = slice.actions;

export const sessionReducer = slice.reducer;
