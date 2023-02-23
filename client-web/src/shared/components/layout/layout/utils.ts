import { useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { resetPopup } from "@/features/feedback/slice";
import { selectPopup } from "@/features/feedback/slice/selectors";
import type { PopupArg } from "@/features/feedback/models/entities";

export type LayoutData = {
    popup?: PopupArg;
    resetPopup: () => void;
};

export const useLayoutData = (): LayoutData => {
    const dispatch = useAppDispatch();
    const onResetPopup = useCallback(() => {
        dispatch(resetPopup());
    }, [dispatch]);

    const popup = useAppSelector(selectPopup);

    return useMemo(() => ({
        popup,
        resetPopup: onResetPopup,
    }), [onResetPopup, popup]);
};
