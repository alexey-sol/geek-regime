import { resources } from "@eggziom/geek-regime-js-utils";

import { provideTags } from "./utils";
import * as cn from "./const";
import type * as tp from "./types";

import { type SpacePageResponse, type SpaceResponse } from "@/features/spaces/models/dtos";
import { appApi } from "@/app/store/api";
import { mergePageContent } from "@/shared/utils/api";

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
        getAllMergedSpaces: builder.query<SpacePageResponse, tp.GetAllMergedSpacesArg>({
            query: (arg) => ({
                params: arg?.params ?? undefined,
                url: `/v1/${SPACES}`,
            }),
            merge: mergePageContent,
            providesTags: (result) => provideTags(result?.content),
            serializeQueryArgs: ({ endpointName, queryArgs }) =>
                `${endpointName}${queryArgs.meta?.locationKey ?? ""}`,
            forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
        }),
        getSpaceBySlug: builder.query<SpaceResponse, tp.GetSpaceBySlugArg>({
            query: (slug) => `/v1/${SPACES}/${slug}`,
        }),
    }),
});

export const {
    useGetAllSpacesQuery,
    useGetAllMergedSpacesQuery,
    useGetSpaceBySlugQuery,
} = spacesApi;
