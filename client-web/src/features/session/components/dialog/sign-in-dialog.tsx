import React from "react";
import { useTranslation } from "react-i18next";

import { BaseDialog } from "@/shared/components/base-dialog";
import { YandexConsentScreen } from "@/features/session/utils/oauth-consent-screen";
import { Button } from "@/shared/components/button";

export type SignInDialogProps = {
    onClose: () => void;
};

export const SignInDialog = ({ onClose }: SignInDialogProps) => {
    const { t } = useTranslation();

    const openWindowToSignInViaYandex = () => {
        const consentScreen = new YandexConsentScreen();
        consentScreen.openWindow();
    };

    return (
        <BaseDialog onClose={onClose} title={t("signIn.dialog.title")}>
            <Button onClick={openWindowToSignInViaYandex} view="secondary">
                {t("oauth.providers.yandex.name")}
            </Button>
        </BaseDialog>
    );
};