import React, { type FC } from "react";
import { Button } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { ControlsWrapStyled } from "./styles";

type SettingsControlsProps = {
    dirty: boolean;
    isPending: boolean;
};

export const SettingsControls: FC<SettingsControlsProps> = ({ dirty, isPending }) => {
    const { t } = useTranslation();

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
