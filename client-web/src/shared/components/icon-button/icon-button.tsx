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
import { DislikeIcon, LikeIcon, PlusIcon } from "@/shared/components/icon";

import * as cn from "./const";

export const CloseIconButton: FC<Partial<BaseIconButtonProps>> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.dialog.closeButton.tooltip")}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_CLOSE}
            icon={CloseIcon}
        />
    </Tooltip>
);

export const GoBackIconButton: FC<Partial<BaseIconButtonProps>> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.dialog.goBackButton.tooltip")}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_GO_BACK}
            icon={GoBackIcon}
        />
    </Tooltip>
);

export const I18nIconButton: FC<Partial<BaseIconButtonProps>> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.navbar.i18nButton.tooltip")}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_I18N}
            icon={I18nIcon}
        />
    </Tooltip>
);

export const ProfileIconButton: FC<Partial<BaseIconButtonProps>> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.navbar.profileButton.tooltip")}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_PROFILE}
            icon={ProfileIcon}
        />
    </Tooltip>
);

export const SearchIconButton: FC<Partial<BaseIconButtonProps>> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("shared.navbar.searchButton.tooltip")}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_SEARCH}
            icon={SearchIcon}
        />
    </Tooltip>
);

export const LikeIconButton: FC<Partial<BaseIconButtonProps>> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("posts.post.likeButton.inactive.tooltip")}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_LIKE}
            icon={LikeIcon}
        />
    </Tooltip>
);

export const DislikeIconButton: FC<Partial<BaseIconButtonProps>> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("posts.post.dislikeButton.inactive.tooltip")}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_DISLIKE}
            icon={DislikeIcon}
        />
    </Tooltip>
);

export const AddItemIconButton: FC<Partial<BaseIconButtonProps>> = ({ disabled, title, ...rest }) => (
    <Tooltip disabled={disabled} message={title ?? t("posts.post.spaces.input.submitButton.tooltip")}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_ADD_ITEM}
            icon={PlusIcon}
        />
    </Tooltip>
);
