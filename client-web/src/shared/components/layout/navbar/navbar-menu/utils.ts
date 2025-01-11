import { useEffect, useMemo } from "react";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { useToggle } from "@/shared/utils/hooks/use-toggle";

export type ProfileItemData = {
    handleClick: () => void;
    showAuthDialog: boolean;
    showProfileDropdown: boolean;
};

export const useProfileItemData = (): ProfileItemData => {
    const { profile } = useAuthContext();
    const isAuthorized = Boolean(profile);

    const {
        isOn: showProfileDropdown,
        off: closeProfileDropdown,
        toggle: toggleShowProfileDropdown,
    } = useToggle();

    const {
        isOn: showAuthDialog,
        off: closeAuthDialog,
        toggle: toggleShowAuthDialog,
    } = useToggle();

    const handleClick = useMemo(
        () => (isAuthorized
            ? toggleShowProfileDropdown
            : toggleShowAuthDialog),
        [isAuthorized, toggleShowProfileDropdown, toggleShowAuthDialog],
    );

    useEffect(() => {
        if (isAuthorized) {
            closeProfileDropdown();
        } else {
            closeAuthDialog();
        }
    }, [isAuthorized, closeProfileDropdown, closeAuthDialog]);

    return useMemo(() => ({
        handleClick,
        showAuthDialog,
        showProfileDropdown,
    }), [handleClick, showProfileDropdown, showAuthDialog]);
};
