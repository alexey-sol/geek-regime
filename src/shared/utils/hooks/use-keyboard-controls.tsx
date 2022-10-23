import React, { useEffect } from "react";

type EventType = "keydown" | "keyup" | "keypress";
type Handler = () => void;

type UseKeyboardControlsArgs = {
    activeElementRef: React.RefObject<HTMLElement>;
    eventType?: EventType;
    onAction?: Handler;
    onCancel?: Handler;
};

export const useKeyboardControls = ({
    activeElementRef,
    eventType = "keydown",
    onAction,
    onCancel,
}: UseKeyboardControlsArgs): void => {
    useEffect(() => {
        const makeElementActiveIfPossible = () => {
            if (activeElementRef.current) {
                activeElementRef.current.focus();
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

            const targetIsWithinActiveElement = current === target || current.contains(target);

            if (handler && targetIsWithinActiveElement) {
                handler();
            }
        };

        document.addEventListener(eventType, handleKeyboardEvent);

        return (): void => {
            document.removeEventListener(eventType, handleKeyboardEvent);
        };
    }, [activeElementRef, eventType, onAction, onCancel]);
};
