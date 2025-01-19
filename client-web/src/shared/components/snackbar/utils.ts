import type { HasElementRef } from "@eggziom/geek-regime-js-ui-kit";

import { useKeyboardControls } from "@/shared/utils/hooks/use-keyboard-controls";
import type { SnackbarProps } from "@/shared/components/snackbar";
import { useTimeout } from "@/shared/utils/hooks/use-timeout";

export type UseSnackbarDataArg = HasElementRef
    & Pick<SnackbarProps, "durationMs" | "onClose">;

export const useSnackbarData = ({
    durationMs,
    elementRef,
    onClose,
}: UseSnackbarDataArg): void => {
    useKeyboardControls({
        elementRef,
        onCancel: onClose,
    });

    useTimeout({
        durationMs,
        onTimeout: onClose,
    });
};
