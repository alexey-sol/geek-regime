import { type RefObject, useEffect } from "react";
import type { HasElementRef } from "@eggziom/geek-regime-js-ui-kit";

export type UseClickOutsideArg = HasElementRef & {
    anchorRef?: RefObject<HTMLElement>;
    mouseEvent?: "click" | "mouseup" | "mousedown";
    onAction: () => void;
};

export const useClickOutside = ({
    anchorRef,
    elementRef,
    mouseEvent = "click",
    onAction,
}: UseClickOutsideArg): void => {
    useEffect(() => {
        const handleClick = ({ target }: Event) => {
            if (!elementRef.current || !(target instanceof HTMLElement)) {
                return;
            }

            const clickedOutside = !elementRef.current.contains(target)
                || !anchorRef?.current?.contains(target);

            if (clickedOutside) {
                onAction();
            }
        };

        document.addEventListener(mouseEvent, handleClick);

        return () => {
            document.removeEventListener(mouseEvent, handleClick);
        };
    }, [anchorRef, elementRef, mouseEvent, onAction]);
};
