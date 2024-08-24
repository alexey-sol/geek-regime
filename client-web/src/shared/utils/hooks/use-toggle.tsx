import { useCallback, useState } from "react";

type UseToggleResult = {
    isOn: boolean;
    setIsOn: (isOn: boolean) => void;
    toggleOn: () => void;
};

export const useToggle = (): UseToggleResult => {
    const [isOn, setIsOn] = useState(false);

    const toggleOn = useCallback(() => setIsOn((prevIsOn) => !prevIsOn), []);

    return { isOn, setIsOn, toggleOn };
};
