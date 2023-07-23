import React, { type FC } from "react";
import { t } from "i18next";
import {
    BaseIconButton,
    CloseIcon,
    GoBackIcon,
    I18nIcon,
    ProfileIcon,
    SearchIcon,
    type BaseIconButtonProps,
} from "@eggziom/geek-regime-js-ui-kit";

import { Tooltip } from "@/shared/components/tooltip";

import * as cn from "./const";

export type IconButtonProps = Pick<BaseIconButtonProps, "disabled"
    | "fontSize"
    | "onClick"
    | "title"
    | "view">;

export const CloseIconButton: FC<IconButtonProps> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.dialog.closeButton.tooltip")}>
        <BaseIconButton
            aria-label={cn.ARIA_LABEL_CLOSE}
            icon={CloseIcon}
            {...rest}
        />
    </Tooltip>
);

export const GoBackIconButton: FC<IconButtonProps> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.dialog.goBackButton.tooltip")}>
        <BaseIconButton
            aria-label={cn.ARIA_LABEL_GO_BACK}
            icon={GoBackIcon}
            {...rest}
        />
    </Tooltip>
);

export const I18nIconButton: FC<IconButtonProps> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.navbar.i18nButton.tooltip")}>
        <BaseIconButton
            aria-label={cn.ARIA_LABEL_I18N}
            icon={I18nIcon}
            {...rest}
        />
    </Tooltip>
);

export const ProfileIconButton: FC<IconButtonProps> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.navbar.profileButton.tooltip")}>
        <BaseIconButton
            aria-label={cn.ARIA_LABEL_PROFILE}
            icon={ProfileIcon}
            {...rest}
        />
    </Tooltip>
);

export const SearchIconButton: FC<IconButtonProps> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.navbar.searchButton.tooltip")}>
        <BaseIconButton
            aria-label={cn.ARIA_LABEL_SEARCH}
            icon={SearchIcon}
            {...rest}
        />
    </Tooltip>
);
