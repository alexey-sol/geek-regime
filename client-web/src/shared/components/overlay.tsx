import React, {
    useCallback,
    useRef,
    type AriaRole,
    type FC,
    type MouseEventHandler,
} from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { getRootElement } from "@/shared/utils/helpers/dom";
import type { HasChildren } from "@/shared/types/props";

const OverlayStyled = styled.section`
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.modal};
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 20%);
`;

export type OverlayProps = HasChildren & {
    className?: string;
    container?: HTMLElement;
    disableCloseOnClick?: boolean;
    onClose: () => void;
    role?: AriaRole;
};

export const Overlay: FC<OverlayProps> = ({
    children,
    className,
    container,
    disableCloseOnClick = false,
    onClose,
    role,
}) => {
    const rootRef = useRef<HTMLElement>(null);

    const handleMouseDownOnRoot: MouseEventHandler<HTMLElement> = useCallback(({ target }) => {
        const targetIsRoot = target === rootRef.current;

        if (targetIsRoot && !disableCloseOnClick) {
            onClose();
        }
    }, [disableCloseOnClick, onClose]);

    const overlayElement = (
        <OverlayStyled
            className={className}
            onMouseDown={handleMouseDownOnRoot}
            ref={rootRef}
            role={role}
        >
            {children}
        </OverlayStyled>
    );

    const resultContainer = container ?? getRootElement();

    return ReactDOM.createPortal(overlayElement, resultContainer);
};
