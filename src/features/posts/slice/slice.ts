import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Paging } from "@/shared/types/models";
import * as defaultValues from "@/shared/const/default-values";
import { PostsState } from "./types";

const initialState: PostsState = {
    paging: {
        page: defaultValues.PAGING_PAGE,
        size: defaultValues.PAGING_SIZE,
    },
};

export const slice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPostsPaging: (state, { payload }: PayloadAction<Paging>) => {
            state.paging = payload;
        },
    },
});

export const { setPostsPaging } = slice.actions;

export const postsReducer = slice.reducer;
