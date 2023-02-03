import { useEffect, useRef } from "react";

import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";
import type { PopupProps } from "@/shared/components/popup/popup";
import type { HasElementRef } from "@/shared/types/props";

export type UsePopupDataArg = HasElementRef & Pick<PopupProps, "durationMs" | "onClose">;

export const usePopupData = ({ durationMs, elementRef, onClose }: UsePopupDataArg) => {
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
