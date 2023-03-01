import React, {
    useEffect,
    useRef,
    type AriaRole,
    type FC,
} from "react";
import ReactDOM from "react-dom";

import { BasePopup, type BasePopupStyledProps } from "@/shared/components/base-popup";
import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";
import { getRootElement } from "@/shared/utils/helpers/dom";
import type { HasChildren } from "@/shared/types/props";

export type BaseDropdownProps = Pick<BasePopupStyledProps, "anchorRef" | "position">
    & HasChildren
    & {
        mouseEvent?: "click" | "mouseup" | "mousedown";
        onClose: () => void;
        role?: AriaRole;
    };

export const BaseDropdown: FC<BaseDropdownProps> = ({
    anchorRef,
    children,
    mouseEvent = "click",
    onClose,
    role = "dialog",
    ...rest
}) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleClick = ({ target }: Event) => {
            if (!elementRef.current || !(target instanceof HTMLElement)) {
                return;
            }

            const clickedOutside = !elementRef.current.contains(target)
                || !anchorRef?.current?.contains(target);

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
        elementRef,
        onCancel: onClose,
    });

    const container = anchorRef?.current ?? getRootElement();

    const dropdown = (
        <BasePopup
            anchorRef={anchorRef}
            ref={elementRef}
            role={role}
            tabIndex={0}
            {...rest}
        >
            {children}
        </BasePopup>
    );

    return ReactDOM.createPortal(dropdown, container);
};
