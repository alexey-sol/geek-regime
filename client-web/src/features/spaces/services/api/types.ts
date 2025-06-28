import { type HasPagingQueryParams, type SearchPagingQueryParams } from "@/shared/types";
import { type Space } from "@/features/spaces/models/entities";

export type GetAllSpacesArg = SearchPagingQueryParams;

export type GetAllMergedSpacesArg = HasPagingQueryParams & {
    meta?: {
        locationKey?: string;
    };
};

export type GetSpaceBySlugArg = Space["slug"];
