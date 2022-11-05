import React from "react";
import { CloseIcon, ProfileIcon, SearchIcon } from "@/shared/components/icon";
import { t } from "i18next";
import { BaseIconButton, BaseIconButtonProps } from "./base-icon-button";

export type IconButtonProps = Pick<BaseIconButtonProps, "onClick">;

export const CloseIconButton = ({ onClick }: IconButtonProps) => (
    <BaseIconButton
        icon={CloseIcon}
        onClick={onClick}
        title={t("dialog.closeButton.title")}
    />
);

export const ProfileIconButton = ({ onClick, username }: IconButtonProps & {
    username?: string;
}) => (
    <BaseIconButton
        icon={ProfileIcon}
        onClick={onClick}
        title={username ?? t("navbar.profileButton.title")}
    />
);

export const SearchIconButton = ({ onClick }: IconButtonProps) => (
    <BaseIconButton
        icon={SearchIcon}
        onClick={onClick}
        title={t("navbar.searchButton.title")}
    />
);
