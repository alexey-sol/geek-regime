import { useSearchParams } from "react-router-dom";

import { SEARCH_PARAMS } from "@/shared/const";

type UseSpaceSearchParamsResult = {
    text?: string;
};

export const useSpaceSearchParams = (): UseSpaceSearchParamsResult => {
    const [searchParams] = useSearchParams();

    const textParam = searchParams.get(SEARCH_PARAMS.TEXT) ?? undefined;

    return {
        text: textParam,
    };
};
