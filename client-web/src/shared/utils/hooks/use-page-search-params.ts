import { useSearchParams } from "react-router-dom";

import { isPeriodValue, isSortValue } from "../guards";

import { SEARCH_PARAMS } from "@/shared/const";
import { type SortValue, type PeriodAndSortQueryParams } from "@/shared/types";

type UsePageSearchParamsResult = PeriodAndSortQueryParams<SortValue> & {
    text?: string;
};

export const usePageSearchParams = (): UsePageSearchParamsResult => {
    const [searchParams] = useSearchParams();

    const periodParam = searchParams.get(SEARCH_PARAMS.PERIOD);
    const sortParam = searchParams.get(SEARCH_PARAMS.SORT);
    const textParam = searchParams.get(SEARCH_PARAMS.TEXT) ?? undefined;

    return {
        period: isPeriodValue(periodParam) ? periodParam : undefined,
        sort: isSortValue(sortParam) ? sortParam : undefined,
        text: textParam,
    };
};
