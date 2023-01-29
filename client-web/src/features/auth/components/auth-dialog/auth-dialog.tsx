import React, { useCallback } from "react";

import { BaseDialog } from "@/shared/components/base-dialog";
import { useAuthDialogData } from "@/features/auth/components/auth-dialog/utils";

import { DialogBodyStyled } from "./style";

export type AuthDialogProps = {
    onClose: () => void;
};

export const AuthDialog = ({ onClose }: AuthDialogProps) => {
    const { Form, goTo, title } = useAuthDialogData();

    const handleGoBack = useCallback(() => {
        goTo("sign-in");
    }, [goTo]);

    return (
        <BaseDialog
            onClose={onClose}
            onGoBack={handleGoBack}
            title={title}
            width="narrow"
        >
            <DialogBodyStyled>
                <Form goTo={goTo} />
            </DialogBodyStyled>
        </BaseDialog>
    );
};
