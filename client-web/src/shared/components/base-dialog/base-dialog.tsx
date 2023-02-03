import React, { ReactNode, useRef } from "react";

import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";

import { Overlay } from "../overlay";
import { Typography } from "../typography";
import { CloseIconButton, GoBackIconButton } from "../icon-button";

import {
    BaseDialogStyled,
    HeaderStyled,
    ControlsWrap,
    type BaseDialogStyledProps,
} from "./style";

export type BaseDialogProps = BaseDialogStyledProps & {
    children?: ReactNode;
    onAction?: () => void;
    onClose: () => void;
    onGoBack?: () => void;
    title?: string;
};

export const BaseDialog = ({
    children,
    onAction,
    onClose,
    onGoBack,
    title,
    ...rest
}: BaseDialogProps) => {
    const elementRef = useRef<HTMLElement>(null);

    useKeyboardControls({
        elementRef,
        onAction,
        onCancel: onClose,
    });

    return (
        <Overlay onClose={onClose}>
            <BaseDialogStyled ref={elementRef} tabIndex={0} {...rest}>
                <HeaderStyled>
                    {title && (
                        <Typography>{title}</Typography>
                    )}

                    <ControlsWrap>
                        {onGoBack && <GoBackIconButton onClick={onGoBack} />}
                        <CloseIconButton onClick={onClose} />
                    </ControlsWrap>

                </HeaderStyled>

                <section>{children}</section>
            </BaseDialogStyled>
        </Overlay>
    );
};
