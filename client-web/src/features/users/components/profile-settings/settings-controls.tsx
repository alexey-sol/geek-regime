import React, { type FC } from "react";
import { Button } from "@eggziom/geek-regime-js-ui-kit/components/button";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

import { ControlsWrapStyled } from "./styles";
import { publishResetAbout } from "./utils";
import { type ProfileSettingsValues } from "./types";

type SettingsControlsProps = {
    isPending: boolean;
};

export const SettingsControls: FC<SettingsControlsProps> = ({ isPending }) => {
    const { t } = useTranslation();
    const { dirty, resetForm } = useFormikContext<ProfileSettingsValues>();

    const disableButtons = !dirty || isPending;

    const resetValues = () => {
        publishResetAbout();
        resetForm();
    };

    return (
        <ControlsWrapStyled>
            <Button disabled={disableButtons} onClick={resetValues}>
                {t("users.profile.settings.actions.resetButton.title")}
            </Button>

            <Button disabled={disableButtons} type="submit" view="secondary">
                {t("users.profile.settings.actions.saveButton.title")}
            </Button>
        </ControlsWrapStyled>
    );
};
