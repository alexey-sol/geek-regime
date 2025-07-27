import { useTimeout } from "./use-timeout";
import { useToggle } from "./use-toggle";

const TRY_MODE_DURATION_MS = 3000;

type UseTryActionArg = {
    onAction: () => void;
};

type UseTryActionResult = {
    isTryModeOn: boolean;
    tryOnAction: () => void;
};

export const useTryAction = ({ onAction }: UseTryActionArg): UseTryActionResult => {
    const {
        isOn: isTryModeOn,
        off: disableTryMode,
        on: enableTryMode,
    } = useToggle();

    useTimeout({
        durationMs: TRY_MODE_DURATION_MS,
        onTimeout: disableTryMode,
        skipTimeout: !isTryModeOn,
    });

    return {
        isTryModeOn,
        tryOnAction: isTryModeOn ? onAction : enableTryMode,
    };
};
