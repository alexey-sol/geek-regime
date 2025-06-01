import { type PagingOptions } from "@/shared/types";
import { type GetAllSpacesArg } from "@/features/spaces/services/spaces-api/types";
import { type UsePageResult } from "@/shared/utils/hooks/use-page";
import { type Space } from "@/features/spaces/models/entities";

export type UseSpacesPageResult = {
    isPending: boolean;
    pagingOptions: PagingOptions;
    spaces: Space[];
};

export type UseGetAllSpacesArg = Pick<UsePageResult, "setTotalElements"> & {
    arg: GetAllSpacesArg;
};

export type UseGetAllSpacesResult = Pick<UseSpacesPageResult, "isPending" | "spaces">;
