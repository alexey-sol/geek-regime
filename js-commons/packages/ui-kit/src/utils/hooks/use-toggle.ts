import { useCallback, useState } from "react";

export type UseToggleResult = {
    isOn: boolean;
    off: () => void;
    on: () => void;
    toggle: () => void;
};

export const useToggle = (): UseToggleResult => {
    const [isOn, setIsOn] = useState(false);

    const toggle = useCallback(() => setIsOn((prevIsOn) => !prevIsOn), []);

    const off = useCallback(() => setIsOn(false), []);

    const on = useCallback(() => setIsOn(true), []);

    return {
        isOn,
        off,
        on,
        toggle,
    };
};
