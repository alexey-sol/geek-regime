import { useEffect, useRef } from "react";

import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";
import type { NotificationProps } from "@/shared/components/notification";
import type { HasElementRef } from "@/shared/types/props";

export type UseNotificationDataArg = HasElementRef
    & Pick<NotificationProps, "durationMs" | "onClose">;

export const useNotificationData = ({
    durationMs,
    elementRef,
    onClose,
}: UseNotificationDataArg): void => {
    const timerIdRef = useRef<number>(0);

    useKeyboardControls({
        elementRef,
        onCancel: onClose,
    });

    useEffect(() => {
        if (durationMs) {
            timerIdRef.current = window.setTimeout(onClose, durationMs);
        }

        return () => {
            if (durationMs) {
                window.clearTimeout(timerIdRef.current);
            }
        };
    }, [onClose, durationMs]);
};
