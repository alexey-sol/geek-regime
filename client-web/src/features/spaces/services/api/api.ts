import { resources } from "@eggziom/geek-regime-js-commons";

import { type SpacePageResponse, type SpaceResponse } from "@/features/spaces/models/dtos";
import { appApi } from "@/app/store/api";

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
        getSpaceBySlug: builder.query<SpaceResponse, tp.GetSpaceBySlugArg>({
            query: (slug) => `/v1/${SPACES}/${slug}`,
        }),
    }),
});

export const {
    useGetAllSpacesQuery,
    useGetSpaceBySlugQuery,
} = spacesApi;
