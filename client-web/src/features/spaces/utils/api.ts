import { mapSearchPagingQueryParams } from "@/shared/utils/api";
import type * as tp from "@/features/spaces/services/api/types";

export const mapGetAllSpacesArg = ({
    searchIn = ["title"],
    ...rest
}: Omit<tp.GetAllSpacesArg, "sort">): tp.GetAllSpacesArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
});
