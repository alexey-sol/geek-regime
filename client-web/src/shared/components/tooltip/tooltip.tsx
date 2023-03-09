import React, {
    type FC, useEffect, useMemo, useRef, useState,
} from "react";

import { Typography } from "@/shared/components/typography";
import {
    type ElementPosition,
    type ElementPositionX,
    type ElementPositionY,
} from "@/shared/components/base-popup";
import type { HasChildren } from "@/shared/types/props";

import { BasePopupStyled, TooltipWrapStyled } from "./style";

export type TooltipProps = HasChildren & {
    disabled?: boolean;
    message: string;
};

export const Tooltip: FC<TooltipProps> = ({ children, disabled = false, message }) => {
    const [isOpen, setIsOpen] = useState(false);

    const childrenWrapRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const childrenWrap = childrenWrapRef.current;

        const openTooltip = () => setIsOpen(true);
        const closeTooltip = () => setIsOpen(false);

        childrenWrap?.addEventListener("mouseenter", openTooltip);
        childrenWrap?.addEventListener("mouseleave", closeTooltip);

        return () => {
            childrenWrap?.removeEventListener("mouseenter", openTooltip);
            childrenWrap?.removeEventListener("mouseleave", closeTooltip);
        };
    }, []);

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

        if (isOpen && tooltipRef.current) {
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

        if (!isOpen) {
            setPositionX("center");
            setPositionY("top");
        }
    }, [disabled, isOpen]);

    const showTooltip = !disabled && isOpen;

    return (
        <TooltipWrapStyled>
            <section ref={childrenWrapRef}>
                {children}
            </section>

            {showTooltip && (
                <BasePopupStyled
                    hasGap
                    position={position}
                    ref={tooltipRef}
                    view="dark"
                >
                    <Typography fontSize="smaller">
                        {message}
                    </Typography>
                </BasePopupStyled>
            )}
        </TooltipWrapStyled>
    );
};
