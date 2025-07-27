import { useTimeout, useKeyboardControls, type HasElementRef } from "@eggziom/geek-regime-js-ui-kit";

import { type SnackbarProps } from "@/shared/components/snackbar";

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
