import React, { useCallback, useEffect, useState } from "react";

import { ProfileIconButton } from "@/shared/components/icon-button";
import { SignInDialog } from "@/features/auth/components/dialog";
import { useAuthContext } from "@/features/auth/contexts/auth";

export const ProfileAction = () => {
    const { profile } = useAuthContext();

    const [showSignInDialog, setShowSignInDialog] = useState(false);

    const toggleSignInDialog = useCallback(() => setShowSignInDialog(((show) => !show)), []);

    useEffect(() => {
        if (profile) {
            setShowSignInDialog(false);
        }
    }, [profile]);

    return (
        <>
            <ProfileIconButton onClick={toggleSignInDialog} />

            {showSignInDialog && (
                <SignInDialog onClose={toggleSignInDialog} />
            )}
        </>
    );
};
