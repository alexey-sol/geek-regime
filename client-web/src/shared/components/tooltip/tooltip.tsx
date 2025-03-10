import React, {
    type FC, type PropsWithChildren, useEffect, useMemo, useRef, useState,
} from "react";
import { HasClassName, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { useToggle } from "@/shared/utils/hooks/use-toggle";
import type {
    ElementPosition, ElementPositionX, ElementPositionY,
} from "@/shared/components/base-popup";

import { BasePopupStyled, TooltipWrapStyled } from "./style";

export type TooltipProps = PropsWithChildren<Partial<HasClassName> & {
    disabled?: boolean;
    message: string;
}>;

export const Tooltip: FC<TooltipProps> = ({
    children,
    className,
    disabled = false,
    message,
}) => {
    const { isOn, off: closeTooltip, on: openTooltip } = useToggle();

    const childrenWrapRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const childrenWrap = childrenWrapRef.current;

        childrenWrap?.addEventListener("mouseenter", openTooltip);
        childrenWrap?.addEventListener("mouseleave", closeTooltip);

        return () => {
            childrenWrap?.removeEventListener("mouseenter", openTooltip);
            childrenWrap?.removeEventListener("mouseleave", closeTooltip);
        };
    }, [closeTooltip, openTooltip]);

    const [positionX, setPositionX] = useState<ElementPositionX>("center");
    const [positionY, setPositionY] = useState<ElementPositionY>("top");

    const position = useMemo<ElementPosition>(
        () => ([positionX, positionY]),
        [positionX, positionY],
    );

    useEffect(() => {
        if (disabled) {
            return;
        }

        if (isOn && tooltipRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            const hasRightEdgeOverflow = (tooltipRect.x + tooltipRect.width) > window.innerWidth;
            const hasLeftEdgeOverflow = tooltipRect.x < 0;

            if (hasRightEdgeOverflow) {
                setPositionX("center-left");
            } else if (hasLeftEdgeOverflow) {
                setPositionX("center-right");
            }

            const hasBottomEdgeOverflow = (tooltipRect.y + tooltipRect.height) > window.innerHeight;
            const hasTopEdgeOverflow = tooltipRect.y < 0;

            if (hasBottomEdgeOverflow) {
                setPositionY("top");
            } else if (hasTopEdgeOverflow) {
                setPositionY("bottom");
            }
        }

        if (!isOn) {
            setPositionX("center");
            setPositionY("top");
        }
    }, [disabled, isOn]);

    const showTooltip = !disabled && isOn;

    return (
        <TooltipWrapStyled>
            <span className={className} ref={childrenWrapRef}>
                {children}
            </span>

            {showTooltip && (
                <BasePopupStyled
                    hasGap
                    position={position}
                    ref={tooltipRef}
                    view="dark"
                >
                    <Typography fontSize="xs">
                        {message}
                    </Typography>
                </BasePopupStyled>
            )}
        </TooltipWrapStyled>
    );
};
