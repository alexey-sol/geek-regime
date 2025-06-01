import { resources } from "@eggziom/geek-regime-js-commons";

import { type SpacePageResponse } from "@/features/spaces/models/dtos";
import { appApi } from "@/app/store/api";
import { type PostDetailsResponse } from "@/features/posts/models/dtos";

import { provideTags } from "./utils";
import * as cn from "./const";
import type * as tp from "./types";

const { SPACES } = resources;

const appApiWithTag = appApi.enhanceEndpoints({
    addTagTypes: [cn.SPACES_TYPE],
});

export const spacesApi = appApiWithTag.injectEndpoints({
    endpoints: (builder) => ({
        getAllSpaces: builder.query<SpacePageResponse, tp.GetAllSpacesArg | void>({
            query: (params) => ({
                params: params ?? undefined,
                url: `/v1/${SPACES}`,
            }),
            providesTags: (result) => provideTags(result?.content),
        }),
        getSpaceBySlug: builder.query<PostDetailsResponse, tp.GetSpaceBySlugArg>({
            query: (slug) => `/v1/${SPACES}/${slug}`,
        }),
    }),
});

export const {
    useGetAllSpacesQuery,
    useGetSpaceBySlugQuery,
} = spacesApi;
