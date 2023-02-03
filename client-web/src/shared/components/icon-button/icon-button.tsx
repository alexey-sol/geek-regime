import React from "react";
import { t } from "i18next";

import {
    CloseIcon,
    GoBackIcon,
    I18nIcon,
    ProfileIcon,
    SearchIcon,
} from "@/shared/components/icon";

import { BaseIconButton, type BaseIconButtonProps } from "./base-icon-button";

export type IconButtonProps = Pick<BaseIconButtonProps, "fontSize" | "onClick" | "title" | "view">;

export const CloseIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        icon={CloseIcon}
        title={title ?? t("dialog.closeButton.title")}
        {...rest}
    />
);

export const GoBackIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        icon={GoBackIcon}
        title={title ?? t("dialog.goBackButton.title")}
        {...rest}
    />
);

export const I18nIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        icon={I18nIcon}
        title={title ?? t("navbar.i18nButton.title")}
        {...rest}
    />
);

export const ProfileIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        icon={ProfileIcon}
        title={title ?? t("navbar.profileButton.title")}
        {...rest}
    />
);

export const SearchIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        icon={SearchIcon}
        title={title ?? t("navbar.searchButton.title")}
        {...rest}
    />
);
