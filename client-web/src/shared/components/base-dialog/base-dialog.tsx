import React, { ReactNode, useRef } from "react";

import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";

import { Overlay } from "../overlay";
import { Typography } from "../typography";
import { CloseIconButton } from "../icon-button";

import { DialogStyled, HeaderStyled } from "./style";

export type BaseDialogProps = {
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
}: BaseDialogProps) => {
    const elementRef = useRef<HTMLElement>(null);
    const onCloseIfNoOnActionProvided = onAction || onClose;

    useKeyboardControls({
        activeElementRef: elementRef,
        onAction: onCloseIfNoOnActionProvided,
        onCancel: onClose,
    });

    return (
        <Overlay onClose={onClose}>
            <DialogStyled ref={elementRef} tabIndex={0}>
                <HeaderStyled>
                    {title && (
                        <Typography>{title}</Typography>
                    )}

                    <CloseIconButton onClick={onClose} />
                </HeaderStyled>

                <section>{children}</section>
            </DialogStyled>
        </Overlay>
    );
};
