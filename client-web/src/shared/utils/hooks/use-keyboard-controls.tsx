import React, { useEffect } from "react";

type Handler = () => void;

type UseKeyboardControlsArgs = {
    activeElementRef: React.RefObject<HTMLElement>;
    keyboardEvent?: "keydown" | "keyup" | "keypress";
    onAction?: Handler;
    onCancel?: Handler;
};

export const useKeyboardControls = ({
    activeElementRef,
    keyboardEvent = "keydown",
    onAction,
    onCancel,
}: UseKeyboardControlsArgs) => {
    useEffect(() => {
        const makeElementActiveIfPossible = () => {
            const { current } = activeElementRef;

            if (current) {
                current.focus();
            }
        };

        // It's necessary to make the passed element active, otherwise event.target in
        // the handler may be some outside element the user clicked earlier.
        // If the passed element is a container like div, it also should have tabIndex = 0
        // prop in order to turn active.
        makeElementActiveIfPossible();
    }, [activeElementRef]);

    useEffect(() => {
        const mapKeysToHandlers: Partial<Record<string, Handler>> = {
            Enter: onAction,
            Escape: onCancel,
        };

        const handleKeyboardEvent = ({ key, target }: KeyboardEvent) => {
            const { current } = activeElementRef;
            const handler = mapKeysToHandlers[key];

            if (!current || !(target instanceof HTMLElement)) {
                return;
            }

            const targetIsWithinActiveElement = target.contains(current)
                || current.contains(target);

            if (handler && targetIsWithinActiveElement) {
                handler();
            }
        };

        document.addEventListener(keyboardEvent, handleKeyboardEvent);

        return () => {
            document.removeEventListener(keyboardEvent, handleKeyboardEvent);
        };
    }, [activeElementRef, keyboardEvent, onAction, onCancel]);
};
