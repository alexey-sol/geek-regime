import React, { type FC } from "react";
import { BaseDialog } from "@eggziom/geek-regime-js-ui-kit";

import { useAuthDialog } from "@/features/auth/components/auth-dialog/utils";

import { DialogBodyStyled } from "./style";

export type AuthDialogProps = {
    onClose: () => void;
};

export const AuthDialog: FC<AuthDialogProps> = ({ onClose }) => {
    const {
        Form,
        goTo,
        handleGoBack,
        title,
    } = useAuthDialog();

    return (
        <BaseDialog
            onClose={onClose}
            onGoBack={handleGoBack}
            title={title}
            width="narrow"
        >
            <DialogBodyStyled>
                <Form goTo={goTo} onSubmit={onClose} />
            </DialogBodyStyled>
        </BaseDialog>
    );
};
