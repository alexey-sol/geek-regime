import { useTimeout, useKeyboardControls } from "@eggziom/geek-regime-js-ui-kit/utils";
import { type HasElementRef } from "@eggziom/geek-regime-js-ui-kit/types";

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
