import React, { useCallback, useState } from "react";

import { ProfileIconButton } from "@/shared/components/icon-button";
import { SignInDialog } from "@/features/session/components/dialog";

export const ProfileAction = () => {
    const [showSignUpDialog, setShowSignUpDialog] = useState(false);

    const toggleSignUpDialog = useCallback(() => setShowSignUpDialog(((show) => !show)), []);

    return (
        <>
            <ProfileIconButton onClick={toggleSignUpDialog} />

            {showSignUpDialog && (
                <SignInDialog onClose={toggleSignUpDialog} />
            )}
        </>
    );
};
