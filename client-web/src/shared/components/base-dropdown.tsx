import React, {
    useRef,
    type AriaRole,
    type FC,
    type PropsWithChildren,
} from "react";
import ReactDOM from "react-dom";

import { BasePopup, type BasePopupStyledProps } from "@/shared/components/base-popup";
import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";
import { getRootElement } from "@/shared/utils/helpers/dom";

import { useClickOutside, UseClickOutsideArg } from "../utils/hooks/use-click-outside";

export type BaseDropdownProps = PropsWithChildren<Pick<UseClickOutsideArg, "mouseEvent">
    & Pick<BasePopupStyledProps, "anchorRef" | "position">
    & {
        onClose: () => void;
        role?: AriaRole;
    }>;

export const BaseDropdown: FC<BaseDropdownProps> = ({
    anchorRef,
    children,
    mouseEvent = "click",
    onClose,
    role = "dialog",
    ...rest
}) => {
    const elementRef = useRef<HTMLElement>(null);

    useClickOutside({
        anchorRef,
        elementRef,
        mouseEvent,
        onAction: onClose,
    });

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
