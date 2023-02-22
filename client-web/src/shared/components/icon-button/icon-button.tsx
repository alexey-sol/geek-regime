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
import * as cn from "./const";

export type IconButtonProps = Pick<BaseIconButtonProps, "fontSize" | "onClick" | "title" | "view">;

export const CloseIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_CLOSE}
        icon={CloseIcon}
        title={title ?? t("dialog.closeButton.title")}
        {...rest}
    />
);

export const GoBackIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_GO_BACK}
        icon={GoBackIcon}
        title={title ?? t("dialog.goBackButton.title")}
        {...rest}
    />
);

export const I18nIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_I18N}
        icon={I18nIcon}
        title={title ?? t("navbar.i18nButton.title")}
        {...rest}
    />
);

export const ProfileIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_PROFILE}
        icon={ProfileIcon}
        title={title ?? t("navbar.profileButton.title")}
        {...rest}
    />
);

export const SearchIconButton = ({ title, ...rest }: IconButtonProps) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_SEARCH}
        icon={SearchIcon}
        title={title ?? t("navbar.searchButton.title")}
        {...rest}
    />
);
