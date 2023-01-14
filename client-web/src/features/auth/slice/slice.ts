import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { User } from "@/features/users/models/entities";

export type AuthState = {
    user?: User;
};

const initialState: AuthState = {
    user: undefined,
};

// TODO don't need
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, {
            payload: user,
        }: PayloadAction<User>) => {
            state.user = user;
        },
    },
});

export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
