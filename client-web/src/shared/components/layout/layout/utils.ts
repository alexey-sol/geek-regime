import { useCallback, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { resetNotification } from "@/features/feedback/slice";
import { selectNotification } from "@/features/feedback/slice/selectors";
import type { NotificationArg } from "@/features/feedback/models/entities";

export type LayoutData = {
    notification?: NotificationArg;
    resetNotification: () => void;
};

export const useLayoutData = (): LayoutData => {
    const dispatch = useAppDispatch();
    const onResetNotification = useCallback(() => {
        dispatch(resetNotification());
    }, [dispatch]);

    const notification = useAppSelector(selectNotification);

    return useMemo(() => ({
        notification,
        resetNotification: onResetNotification,
    }), [onResetNotification, notification]);
};
