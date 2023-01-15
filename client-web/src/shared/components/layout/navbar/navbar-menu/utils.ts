import {
    useCallback, useEffect, useMemo, useState,
} from "react";

import { useAuthContext } from "@/features/auth/contexts/auth";

export type ProfileItemData = {
    handleClick: () => void;
    showProfileDropdown: boolean;
    showSignInDialog: boolean;
};

export const useProfileItemData = (): ProfileItemData => {
    const { profile } = useAuthContext();
    const isAuthorized = Boolean(profile);

    const [showSignInDialog, setShowSignInDialog] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const toggleShowProfileDropdown = useCallback(() =>
        setShowProfileDropdown(((show) => !show)), []);
    const toggleShowSignInDialog = useCallback(() =>
        setShowSignInDialog(((show) => !show)), []);

    const handleClick = useMemo(
        () => (isAuthorized
            ? toggleShowProfileDropdown
            : toggleShowSignInDialog),
        [isAuthorized, toggleShowProfileDropdown, toggleShowSignInDialog],
    );

    useEffect(() => {
        if (profile) {
            setShowSignInDialog(false);
        } else {
            setShowProfileDropdown(false);
        }
    }, [profile]);

    return useMemo(() => ({
        handleClick,
        showProfileDropdown,
        showSignInDialog,
    }), [handleClick, showProfileDropdown, showSignInDialog]);
};
