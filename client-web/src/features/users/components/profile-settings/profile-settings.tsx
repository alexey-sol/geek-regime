import React, { type FC, useRef } from "react";
import { Formik, type FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import { Divider } from "@/shared/components/divider";
import { getProfileSettingsSchema } from "@/features/users/utils/validation/schemas";
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { useAppDispatch } from "@/app/store/hooks";
import { mapUpdateUserByIdArg } from "@/features/users/utils/api";
import { type HasUser } from "@/features/users/types";
import { type UpdateUserRequest } from "@/features/users/models/dtos";

import { useUpdateUserByIdMutation } from "../../services/api";

import { SettingsProfile } from "./settings-profile";
import { SettingsSecurity } from "./settings-security";
import { SettingsPicture } from "./settings-picture";
import { SettingsControls } from "./settings-controls";
import { FormStyled, ProfileSettingsStyled } from "./styles";

export const ProfileSettings: FC<HasUser> = ({ user }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [updateUserById, { isLoading }] = useUpdateUserByIdMutation();

    const formRef = useRef<FormikProps<UpdateUserRequest>>(null);

    const { details, email, id } = user;

    const initialValues: UpdateUserRequest = {
        email,
        newPassword: "",
        oldPassword: "",
        details: {
            about: details.about ?? "",
            description: details.description ?? "",
            gender: details.gender,
            name: details.name,
        },
    };

    const handleSubmit = (values: UpdateUserRequest) => {
        const arg = mapUpdateUserByIdArg({ id, ...values }, initialValues);
        const result = updateUserById(arg).unwrap();
        const onSuccess = () =>
            dispatch(notify(createSuccessSnackbarArg(t("users.query.update.success"))));

        result.then(onSuccess).catch(console.error);
    };

    return (
        <ProfileSettingsStyled>
            <Formik<UpdateUserRequest>
                initialValues={initialValues}
                innerRef={formRef}
                onSubmit={handleSubmit}
                validateOnChange
                validationSchema={getProfileSettingsSchema()}
            >
                {({ errors, dirty, values }) => (
                    <FormStyled>
                        <SettingsProfile errors={errors} userDetails={details} values={values} />
                        <Divider />
                        <SettingsSecurity />
                        <SettingsControls dirty={dirty} isPending={isLoading} />
                    </FormStyled>
                )}
            </Formik>

            <SettingsPicture userDetails={details} />
        </ProfileSettingsStyled>
    );
};
