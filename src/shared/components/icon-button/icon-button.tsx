import React from "react";
import { t } from "i18next";

import {
    CloseIcon,
    I18nIcon,
    ProfileIcon,
    SearchIcon,
} from "@/shared/components/icon";

import { BaseIconButton, type BaseIconButtonProps } from "./base-icon-button";

export type IconButtonProps = Pick<BaseIconButtonProps, "onClick" | "title" | "variation">;

export const CloseIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        icon={CloseIcon}
        title={title ?? t("dialog.closeButton.title")}
        {...rest}
    />
);

export const I18nIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        icon={I18nIcon}
        title={title ?? t("dialog.i18nButton.title")}
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
