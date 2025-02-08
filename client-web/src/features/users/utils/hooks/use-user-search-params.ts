import { useSearchParams } from "react-router-dom";

import { SEARCH_PARAMS } from "@/shared/const";

type UsePostSearchParamsResult = {
    text?: string;
};

export const useUserSearchParams = (): UsePostSearchParamsResult => {
    const [searchParams] = useSearchParams();

    const textParam = searchParams.get(SEARCH_PARAMS.TEXT) ?? undefined;

    return {
        text: textParam,
    };
};
