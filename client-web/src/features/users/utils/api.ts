import { mapSearchPagingQueryParams } from "@/shared/utils/api";
import { omit } from "@/shared/utils/helpers/object";
import { type HasSearchPagingQueryParams, type SearchPagingQueryParams } from "@/shared/types";
import { type UpdateUserRequest } from "@/features/users/models/dtos";
import { type UpdateUserByIdArg } from "@/features/users/services/api/types";

export const mapGetAllUsersArg = ({
    searchIn = ["details.name"],
    ...rest
}: SearchPagingQueryParams): HasSearchPagingQueryParams => ({
    params: mapSearchPagingQueryParams({
        ...rest,
        searchIn,
    }),
});

export const mapUpdateUserByIdArg = (
    { details, id, ...user }: UpdateUserByIdArg,
    initialValues: UpdateUserRequest,
): UpdateUserByIdArg => {
    const filteredDetails = details && omit(details, (key, value) =>
        initialValues.details?.[key] === value);
    const filteredUser = omit(user, (key, value) =>
        initialValues[key] === value);

    return {
        ...filteredUser,
        details: filteredDetails,
        id,
    };
};
