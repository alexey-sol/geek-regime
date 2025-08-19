import { useCallback, useEffect, useRef } from "react";

const isValidDurationMs = (durationMs: number) => durationMs > 0;

type UseTimeoutArg = {
    durationMs?: number;
    onTimeout: () => void;
    skipTimeout?: boolean;
};

type UseTimeoutResult = {
    resetTimeout: () => void;
};

export const useTimeout = ({ durationMs = 0, onTimeout, skipTimeout = false }: UseTimeoutArg): UseTimeoutResult => {
    const timerIdRef = useRef<number>(0);

    const resetTimeout = useCallback(() => {
        if (isValidDurationMs(durationMs)) {
            window.clearTimeout(timerIdRef.current);
        }
    }, [durationMs]);

    useEffect(() => {
        if (!skipTimeout && isValidDurationMs(durationMs)) {
            timerIdRef.current = window.setTimeout(onTimeout, durationMs);
        }

        return resetTimeout;
    }, [onTimeout, durationMs, resetTimeout, skipTimeout]);

    return {
        resetTimeout,
    };
};
