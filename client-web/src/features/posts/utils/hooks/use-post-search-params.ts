import { useSearchParams } from "react-router-dom";

import { SEARCH_PARAMS } from "@/shared/const";
import { isPeriodValue, isSortValue } from "@/features/posts/utils/guards";
import { type PostsPageSettings } from "@/features/posts/types";

export const usePostSearchParams = (): Partial<PostsPageSettings> => {
    const [searchParams] = useSearchParams();

    const periodParam = searchParams.get(SEARCH_PARAMS.PERIOD);
    const sortParam = searchParams.get(SEARCH_PARAMS.SORT);

    const period = isPeriodValue(periodParam) ? periodParam : undefined;
    const sort = isSortValue(sortParam) ? sortParam : undefined;

    return { period, sort };
};
