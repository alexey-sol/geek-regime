import { useParams } from "react-router";
import { useCallback, useEffect, useMemo } from "react";

import type { PagingOptions } from "@/shared/types";
import { defaults } from "@/shared/const";

type UsePageProps = {
    initialPagingOptions: PagingOptions;
    setPagingOptions: (pagingOptions: Partial<PagingOptions>) => void;
};

export type UsePageResult = {
    pagingOptions: PagingOptions;
    setTotalElements: (totalElements: number) => void;
};

export const usePage = ({
    initialPagingOptions,
    setPagingOptions,
}: UsePageProps): UsePageResult => {
    const params = useParams();

    const setTotalElements = useCallback<UsePageResult["setTotalElements"]>((totalElements) =>
        setPagingOptions({ totalElements }), [setPagingOptions]);

    const page = params.page
        ? +params.page
        : defaults.START_PAGE;

    const pagingOptions = useMemo<UsePageResult["pagingOptions"]>(() =>
        ({ ...initialPagingOptions, page }), [initialPagingOptions, page]);

    useEffect(() => {
        setPagingOptions({ page });
    }, [setPagingOptions, page]);

    return { pagingOptions, setTotalElements };
};
