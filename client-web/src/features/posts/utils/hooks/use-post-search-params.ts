import { useSearchParams } from "react-router-dom";

import { SEARCH_PARAMS } from "@/shared/const";
import { isPeriodValue, isSortValue } from "@/features/posts/utils/guards";
import { type PostsPageSettings } from "@/features/posts/types";

type UsePostSearchParamsResult = Partial<PostsPageSettings> & {
    text?: string;
};

export const usePostSearchParams = (): UsePostSearchParamsResult => {
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
