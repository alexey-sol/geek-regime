import React, { memo, useEffect, useRef } from "react";
import { useToggle } from "@eggziom/geek-regime-js-ui-kit/utils";

import { ProfileItemStyled } from "./style";

import { ProfileDropdown } from "@/features/auth/components/profile-dropdown";
import { AuthDialog } from "@/features/auth/components/auth-dialog";
import { useAuthContext } from "@/features/auth/contexts/auth";
import { ProfileButton } from "@/features/users/components/button/profile-button";

const PICTURE_SIZE_PX = 30;

export const ProfileItem = memo(() => {
    const profileItemRef = useRef<HTMLElement>(null);

    const { profile } = useAuthContext();

    const {
        isOn: showProfileDropdown,
        off: closeProfileDropdown,
        on: openProfileDropdown,
    } = useToggle();

    const {
        isOn: showAuthDialog,
        off: closeAuthDialog,
        on: openAuthDialog,
    } = useToggle();

    useEffect(() => {
        if (profile) {
            closeProfileDropdown();
        } else {
            closeAuthDialog();
        }
    }, [closeProfileDropdown, closeAuthDialog, profile]);

    const handleClickOnProfileButton = profile
        ? openProfileDropdown
        : openAuthDialog;

    return (
        <ProfileItemStyled ref={profileItemRef}>
            <ProfileButton
                onClick={handleClickOnProfileButton}
                sizePx={PICTURE_SIZE_PX}
                user={profile}
            />

            {showProfileDropdown && (
                <ProfileDropdown anchorRef={profileItemRef} onClose={closeProfileDropdown} />
            )}

            {showAuthDialog && (
                <AuthDialog onClose={closeAuthDialog} />
            )}
        </ProfileItemStyled>
    );
});
