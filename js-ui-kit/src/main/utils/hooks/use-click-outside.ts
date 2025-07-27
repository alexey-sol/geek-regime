import { useEffect } from "react";

import { type HasElementRef } from "@/types/props";

export type UseClickOutsideArg = HasElementRef & {
    mouseEvent?: "click" | "mouseup" | "mousedown";
    onClose: () => void;
};

export const useClickOutside = ({
    elementRef,
    mouseEvent = "click",
    onClose,
}: UseClickOutsideArg): void => {
    useEffect(() => {
        const handleClick = ({ target }: Event) => {
            setTimeout(() => { // [1]
                const clickedOutside = target instanceof Node && elementRef.current
                    && !elementRef.current.contains(target);

                if (clickedOutside) {
                    onClose();
                }
            });
        };

        document.addEventListener(mouseEvent, handleClick, true);

        return () => {
            document.removeEventListener(mouseEvent, handleClick, true);
        };
    }, [elementRef, mouseEvent, onClose]);
};

// [1]. Delay the execution in the event loop a bit to fix immediate re-opening the popup if the
// outside element that you've clicked on, happened to be a button that opens the popup.
