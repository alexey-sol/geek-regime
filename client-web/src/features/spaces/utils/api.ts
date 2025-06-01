import { mapSearchPagingQueryParams } from "@/shared/utils/api";
import { type GetAllSpacesArg } from "@/features/spaces/services/spaces-api/types";

export const mapGetAllSpacesArg = ({
    searchIn = ["title", "description"],
    ...rest
}: Omit<GetAllSpacesArg, "sort">): GetAllSpacesArg => ({
    ...mapSearchPagingQueryParams({ ...rest, searchIn }),
});
