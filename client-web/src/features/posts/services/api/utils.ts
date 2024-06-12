import type { ThunkDispatch } from "redux-thunk";
import type { AnyAction } from "redux";
import type { Recipe } from "@reduxjs/toolkit/dist/query/core/buildThunks";

import { getApiPath } from "@/shared/utils/formatters/api-path";
import * as tp from "@/features/posts/services/api/types";
import { type PostsApiUtil } from "@/features/posts/services/api/api";
import type { RootState } from "@/app/store";
import type { PostDetailsDto, PostsPage } from "@/features/posts/models/dtos";
import type { PostsState } from "@/features/posts/slice";

import * as cn from "./const";
import type { GetAllPostsArg } from "./types";

const PAGE_OFFSET = 1;
const API_VERSION = 1;

export const baseUrl = getApiPath(API_VERSION);

export const transformPaging = (paging?: GetAllPostsArg["paging"]): string | undefined => {
    if (paging) {
        const result: GetAllPostsArg["paging"] = {
            ...paging,
            page: paging.page - PAGE_OFFSET,
        };

        return JSON.stringify(result);
    }

    return undefined;
};

export const createTag = (id: string | number = cn.TAG_LIST_ID): {
    id: string | number;
    type: typeof cn.POSTS_TAG_TYPE;
} => ({
    id,
    type: cn.POSTS_TAG_TYPE,
});

export const getDataUpdaters = (
    dispatch: ThunkDispatch<RootState, void, AnyAction>,
    util: PostsApiUtil,
) => ({
    updatePostData: (
        data: PostDetailsDto,
    ) => dispatch(
        util.upsertQueryData("getPostBySlug", data.slug, data),
    ),
    updatePostsData: (
        paging: PostsState["pagingOptions"],
        updatePostsPageRecipe: Recipe<PostsPage>,
    ) => {
        const getAllPostsArg: tp.GetAllPostsArg = { paging };

        dispatch(util.updateQueryData(
            "getAllPosts",
            getAllPostsArg,
            updatePostsPageRecipe,
        ));
    },
    updatePostsByAuthorData: (
        paging: PostsState["pagingOptions"],
        authorId: number,
        updatePostsPageRecipe: Recipe<PostsPage>,
    ) => {
        const getAllPostsByAuthorArg: tp.GetAllPostsArg = {
            filter: { authorId },
            paging,
        };

        dispatch(util.updateQueryData(
            "getAllPosts",
            getAllPostsByAuthorArg,
            updatePostsPageRecipe,
        ));
    },
});
