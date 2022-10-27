import React from "react";
import { BaseDialog } from "@/shared/components/base-dialog/base-dialog";
import { t } from "i18next";
import { YandexConsentScreen } from "@/features/session/utils/oauth-consent-screen";
import { Button } from "@/shared/components/button";

export type SignInDialogProps = {
    onClose: () => void;
};

export const SignInDialog = ({ onClose }: SignInDialogProps) => {
    const openWindowToSignInViaYandex = () => {
        const consentScreen = new YandexConsentScreen();
        consentScreen.openWindow();
    };

    const dialogTitle = t("signIn.dialog.title");
    const yandexName = t("oauth.providers.yandex.name");

    return (
        <BaseDialog onClose={onClose} title={dialogTitle}>
            <Button onClick={openWindowToSignInViaYandex}>{yandexName}</Button>
        </BaseDialog>
    );
};
