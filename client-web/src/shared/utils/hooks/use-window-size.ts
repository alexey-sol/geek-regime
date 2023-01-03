import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

const getWindowSize = () => {
    const {
        innerWidth: width,
        innerHeight: height,
    } = window;

    return { width, height };
};

export function useWindowSize(delayInMs = 0) {
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
}
