import { useEffect, useRef } from "react";

import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";
import type { SnackbarProps } from "@/shared/components/snackbar";
import type { HasElementRef } from "@/shared/types/props";

export type UseSnackbarDataArg = HasElementRef
    & Pick<SnackbarProps, "durationMs" | "onClose">;

export const useSnackbarData = ({
    durationMs,
    elementRef,
    onClose,
}: UseSnackbarDataArg): void => {
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
