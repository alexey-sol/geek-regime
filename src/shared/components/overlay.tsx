import React, {
    AriaRole,
    MouseEventHandler,
    ReactNode,
    useCallback,
    useRef,
} from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const OverlayStyled = styled.section`
    position: fixed;
    z-index: ${({ theme }) => theme.components.overlay.zIndex};
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 20%);
`;

export type OverlayProps = {
    children: ReactNode;
    className?: string;
    container?: Element;
    disableCloseOnClick?: boolean;
    onClose: () => void;
    role?: AriaRole;
};

export const Overlay = ({
    children,
    className,
    container,
    disableCloseOnClick = false,
    onClose,
    role,
}: OverlayProps) => {
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

    return ReactDOM.createPortal(overlayElement, container || document.body);
};
