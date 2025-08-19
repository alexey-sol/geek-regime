import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

export type UseWindowSizeResult = {
    width: number;
    height: number;
};

const getWindowSize = (): UseWindowSizeResult => {
    const { innerWidth: width, innerHeight: height } = window;

    return { width, height };
};

export const useWindowSize = (delayInMs = 0): UseWindowSizeResult => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(getWindowSize());
        };

        const debouncedHandleResize = debounce(handleResize, delayInMs);

        window.addEventListener("resize", debouncedHandleResize);

        return () => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, [delayInMs]);

    return windowSize;
};
