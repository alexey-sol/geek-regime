import React, { type FC, type ReactNode, useRef } from "react";

import { Overlay } from "../overlay/overlay";
import { CloseIconButton, GoBackIconButton } from "../icon-button";
import { Typography } from "../typography";

import { BaseDialogStyled, HeaderStyled, ControlsWrap, type BaseDialogStyledProps } from "./style";

import { useKeyboardControls } from "@/utils/hooks/use-keyboard-controls";

export type BaseDialogProps = BaseDialogStyledProps & {
    children?: ReactNode;
    onAction?: () => void;
    onClose: () => void;
    onGoBack?: () => void;
    title?: string;
};

export const BaseDialog: FC<BaseDialogProps> = ({ children, onAction, onClose, onGoBack, title, ...rest }) => {
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
                    {title && <Typography>{title}</Typography>}

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
