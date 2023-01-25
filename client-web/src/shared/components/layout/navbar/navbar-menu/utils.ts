import {
    useCallback, useEffect, useMemo, useState,
} from "react";

import { useAuthContext } from "@/features/auth/contexts/auth";

export type ProfileItemData = {
    handleClick: () => void;
    showAuthDialog: boolean;
    showProfileDropdown: boolean;
};

export const useProfileItemData = (): ProfileItemData => {
    const { profile } = useAuthContext();
    const isAuthorized = Boolean(profile);

    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const toggleShowProfileDropdown = useCallback(() =>
        setShowProfileDropdown(((show) => !show)), []);
    const toggleShowAuthDialog = useCallback(() =>
        setShowAuthDialog(((show) => !show)), []);

    const handleClick = useMemo(
        () => (isAuthorized
            ? toggleShowProfileDropdown
            : toggleShowAuthDialog),
        [isAuthorized, toggleShowProfileDropdown, toggleShowAuthDialog],
    );

    useEffect(() => {
        if (isAuthorized) {
            setShowAuthDialog(false);
        } else {
            setShowProfileDropdown(false);
        }
    }, [isAuthorized]);

    return useMemo(() => ({
        handleClick,
        showAuthDialog,
        showProfileDropdown,
    }), [handleClick, showProfileDropdown, showAuthDialog]);
};
