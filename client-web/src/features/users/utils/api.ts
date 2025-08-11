import { type HasId } from "@eggziom/geek-regime-js-utils";

import { mapSearchPagingQueryParams } from "@/shared/utils/api";
import { omit, omitFalsy, omitUndefined } from "@/shared/utils/helpers/object";
import { type HasSearchPagingQueryParams, type SearchPagingQueryParams } from "@/shared/types";
import { type UpdateUserByIdArg } from "@/features/users/services/api/types";
import { type ProfileSettingsValues } from "@/features/users/components/profile-settings/types";

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
    {
        credentials,
        details,
        id,
        ...user
    }: ProfileSettingsValues & HasId,
    initialValues: ProfileSettingsValues,
): UpdateUserByIdArg => {
    const { newPassword, oldPassword } = omitFalsy(credentials);
    const filteredDetails = details && omit(details, (key, value) =>
        initialValues.details?.[key] === value);
    const filteredUser = omit(user, (key, value) =>
        initialValues[key] === value);

    return omitUndefined({
        ...filteredUser,
        details: filteredDetails,
        id,
        newPassword,
        oldPassword,
    });
};
