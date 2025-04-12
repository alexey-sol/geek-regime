import React, { type FC } from "react";
import { Button } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

import { type UpdateUserRequest } from "@/features/users/models/dtos";

import { ControlsWrapStyled } from "./styles";

type SettingsControlsProps = {
    isPending: boolean;
};

export const SettingsControls: FC<SettingsControlsProps> = ({ isPending }) => {
    const { t } = useTranslation();
    const { dirty } = useFormikContext<UpdateUserRequest>();

    const disableButtons = !dirty || isPending;

    return (
        <ControlsWrapStyled>
            <Button disabled={disableButtons}>
                {t("users.profile.settings.actions.resetButton.title")}
            </Button>

            <Button disabled={disableButtons} type="submit" view="secondary">
                {t("users.profile.settings.actions.saveButton.title")}
            </Button>
        </ControlsWrapStyled>
    );
};
