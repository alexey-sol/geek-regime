import React, { type FC } from "react";

import { BaseIconButton, type BaseIconButtonProps } from "../base-icon-button";
import { Tooltip } from "../tooltip";
import {
    CloseIcon, DislikeIcon, GoBackIcon, I18nIcon, LikeIcon, PlusIcon, ProfileIcon, SearchIcon,
} from "../icon";

import * as cn from "./const";

export const AddItemIconButton: FC<Partial<BaseIconButtonProps>> = ({ title, ...rest }) => (
    <Tooltip disabled={!title} message={title}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_ADD_ITEM}
            icon={PlusIcon}
        />
    </Tooltip>
);

export const CloseIconButton: FC<Partial<BaseIconButtonProps>> = ({ title, ...rest }) => (
    <Tooltip disabled={!title} message={title}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_CLOSE}
            icon={CloseIcon}
        />
    </Tooltip>
);

export const DislikeIconButton: FC<Partial<BaseIconButtonProps>> = ({ title, ...rest }) => (
    <Tooltip disabled={!title} message={title}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_DISLIKE}
            icon={DislikeIcon}
        />
    </Tooltip>
);

export const GoBackIconButton: FC<Partial<BaseIconButtonProps>> = ({ title, ...rest }) => (
    <Tooltip disabled={!title} message={title}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_GO_BACK}
            icon={GoBackIcon}
        />
    </Tooltip>
);

export const I18nIconButton: FC<Partial<BaseIconButtonProps>> = ({ title, ...rest }) => (
    <Tooltip disabled={!title} message={title}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_I18N}
            icon={I18nIcon}
        />
    </Tooltip>
);

export const LikeIconButton: FC<Partial<BaseIconButtonProps>> = ({ title, ...rest }) => (
    <Tooltip disabled={!title} message={title}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_LIKE}
            icon={LikeIcon}
        />
    </Tooltip>
);

export const ProfileIconButton: FC<Partial<BaseIconButtonProps>> = ({ title, ...rest }) => (
    <Tooltip disabled={!title} message={title}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_PROFILE}
            icon={ProfileIcon}
        />
    </Tooltip>
);

export const SearchIconButton: FC<Partial<BaseIconButtonProps>> = ({ title, ...rest }) => (
    <Tooltip disabled={!title} message={title}>
        <BaseIconButton
            {...rest}
            aria-label={cn.ARIA_LABEL_SEARCH}
            icon={SearchIcon}
        />
    </Tooltip>
);
