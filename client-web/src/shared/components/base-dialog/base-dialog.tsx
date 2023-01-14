import React, { ReactNode, useRef } from "react";

import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";

import { Overlay } from "../overlay";
import { Typography } from "../typography";
import { CloseIconButton } from "../icon-button";

import { BaseDialogStyled, HeaderStyled, type BaseDialogStyledProps } from "./style";

export type BaseDialogProps = BaseDialogStyledProps & {
    children?: ReactNode;
    onAction?: () => void;
    onClose: () => void;
    title?: string;
};

export const BaseDialog = ({
    children,
    onAction,
    onClose,
    title,
    ...rest
}: BaseDialogProps) => {
    const elementRef = useRef<HTMLElement>(null);

    useKeyboardControls({
        activeElementRef: elementRef,
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

                    <CloseIconButton onClick={onClose} />
                </HeaderStyled>

                <section>{children}</section>
            </BaseDialogStyled>
        </Overlay>
    );
};
