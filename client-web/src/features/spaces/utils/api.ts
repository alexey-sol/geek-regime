import { mapSearchPagingQueryParams } from "@/shared/utils/api";
import { type GetAllSpacesArg } from "@/features/spaces/services/api/types";

export const mapGetAllSpacesArg = ({
    searchIn = ["title"],
    ...rest
}: Omit<GetAllSpacesArg, "sort">): GetAllSpacesArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
});
