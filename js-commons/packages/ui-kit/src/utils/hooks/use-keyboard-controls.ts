import { useEffect } from "react";

import { type HasElementRef } from "@/types/props";

type Handler = () => void;

type UseKeyboardControlsArg = HasElementRef & {
    keyboardEvent?: "keydown" | "keyup" | "keypress";
    onAction?: Handler;
    onCancel?: Handler;
};

export const useKeyboardControls = ({
    elementRef,
    keyboardEvent = "keydown",
    onAction,
    onCancel,
}: UseKeyboardControlsArg): void => {
    useEffect(() => {
        const makeElementActiveIfPossible = () => {
            const { current } = elementRef;

            if (current) {
                current.focus();
            }
        };

        // It's necessary to make the passed element active, otherwise event.target in
        // the handler may be some outside element the user clicked earlier.
        // If the passed element is a container like div, it also should have tabIndex = 0
        // prop in order to turn active.
        makeElementActiveIfPossible();
    }, [elementRef]);

    useEffect(() => {
        const mapKeysToHandlers: Partial<Record<string, Handler>> = {
            Enter: onAction,
            Escape: onCancel,
        };

        const handleKeyboardEvent = ({ key, target }: KeyboardEvent) => {
            const { current } = elementRef;
            const handler = mapKeysToHandlers[key];

            if (!current || !(target instanceof HTMLElement)) {
                return;
            }

            const targetIsWithinActiveElement = target.contains(current) || current.contains(target);

            if (handler && targetIsWithinActiveElement) {
                handler();
            }
        };

        document.addEventListener(keyboardEvent, handleKeyboardEvent);

        return () => {
            document.removeEventListener(keyboardEvent, handleKeyboardEvent);
        };
    }, [elementRef, keyboardEvent, onAction, onCancel]);
};
