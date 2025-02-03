import { mapSearchPagingQueryParams } from "@/shared/utils/api";
import { type HasSearchPagingQueryParams, type SearchPagingQueryParams } from "@/shared/types";

export const normalizeGetAllUsersArg = ({
    searchIn = ["details.name"],
    ...rest
}: SearchPagingQueryParams): HasSearchPagingQueryParams => ({
    params: mapSearchPagingQueryParams({
        ...rest,
        searchIn,
    }),
});
