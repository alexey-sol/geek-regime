import React from "react";
import { BaseDialog } from "@/shared/components/base-dialog/base-dialog";
import { t } from "i18next";

export type SignUpDialogProps = {
    onClose: () => void;
};

export const SignUpDialog = ({ onClose }: SignUpDialogProps) => (
    <BaseDialog onClose={onClose} title={t("signUp.dialog.title")}>
        <button>Google</button>
    </BaseDialog>
);
