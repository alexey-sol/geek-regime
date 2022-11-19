import React, {
    AriaRole, ReactNode, useEffect, useRef,
} from "react";
import ReactDOM from "react-dom";

import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";

import { BaseDropdownStyled } from "./style";
import { BaseDropdownStyledProps } from "./types";

export type BaseDropdownProps = BaseDropdownStyledProps & {
    children: ReactNode;
    mouseEvent?: "click" | "mouseup" | "mousedown";
    onClose: () => void;
    role?: AriaRole;
};

export const BaseDropdown = ({
    anchorRef,
    children,
    mouseEvent = "click",
    onClose,
    role = "dialog",
    ...rest
}: BaseDropdownProps) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClick = ({ target }: Event) => {
            if (!elementRef.current || !(target instanceof HTMLElement)) {
                return;
            }

            const clickedOutside = !elementRef.current.contains(target)
                && !anchorRef?.current?.contains(target);

            if (clickedOutside) {
                onClose();
            }
        };

        document.addEventListener(mouseEvent, handleClick);

        return () => {
            document.removeEventListener(mouseEvent, handleClick);
        };
    }, [anchorRef, mouseEvent, onClose]);

    useKeyboardControls({
        activeElementRef: elementRef,
        onCancel: onClose,
    });

    const container = anchorRef?.current || document.body;

    const dropdownElement = (
        <BaseDropdownStyled
            anchorRef={anchorRef}
            ref={elementRef}
            role={role}
            tabIndex={0}
            {...rest}
        >
            {children}
        </BaseDropdownStyled>
    );

    return ReactDOM.createPortal(dropdownElement, container);
};
