import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Paging } from "@/shared/types/models";
import { defaults } from "@/shared/const";
import { PostsState } from "./types";

const initialState: PostsState = {
    paging: {
        page: defaults.PAGING_PAGE,
        size: defaults.PAGING_SIZE,
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
