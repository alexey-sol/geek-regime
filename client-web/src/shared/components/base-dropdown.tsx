import React, {
    memo,
    useRef,
    type AriaRole,
    type FC,
    type PropsWithChildren,
    type RefObject,
} from "react";
import ReactDOM from "react-dom";

import { BasePopup, type BasePopupStyledProps } from "@/shared/components/base-popup";
import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";
import { getRootElement } from "@/shared/utils/helpers/dom";

import { useClickOutside, UseClickOutsideArg } from "../utils/hooks/use-click-outside";

export type BaseDropdownProps = PropsWithChildren<Pick<UseClickOutsideArg, "mouseEvent">
    & Pick<BasePopupStyledProps, "position">
    & {
        anchorRef?: RefObject<HTMLElement>;
        onClose: () => void;
        role?: AriaRole;
    }>;

export const BaseDropdown: FC<BaseDropdownProps> = memo(({
    anchorRef,
    children,
    mouseEvent = "click",
    onClose,
    role = "dialog",
    ...rest
}) => {
    const elementRef = useRef<HTMLElement>(null);

    useClickOutside({
        elementRef,
        mouseEvent,
        onClose,
    });

    useKeyboardControls({
        elementRef,
        onCancel: onClose,
    });

    const container = anchorRef?.current ?? getRootElement();

    const dropdown = (
        <BasePopup
            ref={elementRef}
            role={role}
            tabIndex={0}
            {...rest}
        >
            {children}
        </BasePopup>
    );

    return ReactDOM.createPortal(dropdown, container);
});
