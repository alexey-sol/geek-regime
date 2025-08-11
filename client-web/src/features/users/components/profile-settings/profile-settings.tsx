import React, { type FC, useRef } from "react";
import { Formik, type FormikConfig, type FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { Divider } from "@eggziom/geek-regime-js-ui-kit/components/divider";

import { useUpdateUserByIdMutation } from "../../services/api";

import { SettingsProfile } from "./settings-profile";
import { SettingsSecurity } from "./settings-security";
import { SettingsPicture } from "./settings-picture";
import { SettingsControls } from "./settings-controls";
import { FormStyled, ProfileSettingsStyled } from "./styles";
import { type ProfileSettingsValues } from "./types";
import { getInitialValues } from "./utils";

import { type HasUser } from "@/features/users/types";
import { mapUpdateUserByIdArg } from "@/features/users/utils/api";
import { useAppDispatch } from "@/app/store/hooks";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { notify } from "@/app/store/actions";
import { getProfileSettingsSchema } from "@/features/users/utils/validation/schemas";

export const ProfileSettings: FC<HasUser> = ({ user }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [updateUserById, { isLoading }] = useUpdateUserByIdMutation();

    const formRef = useRef<FormikProps<ProfileSettingsValues>>(null);

    const { details, id, meta } = user;
    const initialValues = getInitialValues(user);

    const handleSubmit: FormikConfig<ProfileSettingsValues>["onSubmit"] = (
        values,
        { resetForm },
    ) => {
        const arg = mapUpdateUserByIdArg({ id, ...values }, initialValues);
        const result = updateUserById(arg).unwrap();

        const onSuccess = () => {
            resetForm({ // [1]
                values: {
                    ...values,
                    credentials: initialValues.credentials,
                },
            });

            dispatch(notify(createSuccessSnackbarArg(t("users.query.update.success"))));
        };

        result.then(onSuccess).catch(console.error);
    };

    return (
        <ProfileSettingsStyled>
            <Formik<ProfileSettingsValues>
                initialValues={initialValues}
                innerRef={formRef}
                onSubmit={handleSubmit}
                validateOnChange
                validationSchema={getProfileSettingsSchema(meta.hasCredentials)}
            >
                {() => (
                    <FormStyled>
                        <SettingsProfile userDetails={details} />
                        <Divider />
                        <SettingsSecurity hasCredentials={meta?.hasCredentials} />
                        <SettingsControls isPending={isLoading} />
                    </FormStyled>
                )}
            </Formik>

            <SettingsPicture userDetails={details} userId={id} />
        </ProfileSettingsStyled>
    );
};

// [1]. Reset dirty state so that apply and reset buttons get disabled again after submitting. We
// need to keep submitted values but empty password fields.
