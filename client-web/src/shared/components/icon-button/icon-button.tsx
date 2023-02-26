import React, { type FC } from "react";
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

export const CloseIconButton: FC<IconButtonProps> = ({ title, ...rest }) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_CLOSE}
        icon={CloseIcon}
        title={title ?? t("shared.dialog.closeButton.tooltip")}
        {...rest}
    />
);

export const GoBackIconButton: FC<IconButtonProps> = ({ title, ...rest }) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_GO_BACK}
        icon={GoBackIcon}
        title={title ?? t("shared.dialog.goBackButton.tooltip")}
        {...rest}
    />
);

export const I18nIconButton: FC<IconButtonProps> = ({ title, ...rest }) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_I18N}
        icon={I18nIcon}
        title={title ?? t("shared.navbar.i18nButton.tooltip")}
        {...rest}
    />
);

export const ProfileIconButton: FC<IconButtonProps> = ({ title, ...rest }) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_PROFILE}
        icon={ProfileIcon}
        title={title ?? t("shared.navbar.profileButton.tooltip")}
        {...rest}
    />
);

export const SearchIconButton: FC<IconButtonProps> = ({ title, ...rest }) => (
    <BaseIconButton
        aria-label={cn.ARIA_LABEL_SEARCH}
        icon={SearchIcon}
        title={title ?? t("shared.navbar.searchButton.tooltip")}
        {...rest}
    />
);
