import { useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { resetSnackbar } from "@/features/feedback/slice";
import { selectSnackbar } from "@/features/feedback/slice/selectors";
import type { SnackbarArg } from "@/features/feedback/models/entities";

export type LayoutData = {
    snackbar?: SnackbarArg;
    resetSnackbar: () => void;
};

export const useLayoutData = (): LayoutData => {
    const dispatch = useAppDispatch();
    const onResetSnackbar = useCallback(() => {
        dispatch(resetSnackbar());
    }, [dispatch]);

    const snackbar = useAppSelector(selectSnackbar);

    return useMemo(() => ({
        snackbar,
        resetSnackbar: onResetSnackbar,
    }), [onResetSnackbar, snackbar]);
};
