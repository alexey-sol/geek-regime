import { type ChangeEventHandler, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SEARCH_PARAMS } from "@/shared/const";
import { usePageSearchParams } from "@/shared/utils/hooks/use-page-search-params";
import { type SortValue, type PeriodAndSortQueryParams } from "@/shared/types";
import { type PagePeriod } from "@/shared/models/dtos";
import { isPeriodValue, isSortValue } from "@/shared/utils/guards";

const INITIAL_PERIOD: PagePeriod = "OVERALL";
const INITIAL_SORT: SortValue = "LATEST";

type SettingSetter = (value: string) => void;

type SelectChangeEventHandler = ChangeEventHandler<{ value: string }>;

type Settings = Required<PeriodAndSortQueryParams<SortValue>>;

type UsePageSettingsResult = {
    handlePeriodChange: SelectChangeEventHandler;
    handleSortChange: SelectChangeEventHandler;
    handleSubmit: () => void;
    settings: Settings;
};

export const usePageSettings = (): UsePageSettingsResult => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        period: initialPeriod = INITIAL_PERIOD,
        sort: initialSort = INITIAL_SORT,
    } = usePageSearchParams();

    const [settings, setSettings] = useState<Settings>({
        period: initialPeriod,
        sort: initialSort,
    });

    const setPeriodIfPossible: SettingSetter = useCallback((value) => {
        if (!isPeriodValue(value)) {
            return;
        }

        setSettings((prevSettings) => ({
            ...prevSettings,
            period: value,
        }));
    }, []);

    const setSortIfPossible: SettingSetter = useCallback((value) => {
        if (!isSortValue(value)) {
            return;
        }

        setSettings((prevSettings) => ({
            ...prevSettings,
            sort: value,
        }));
    }, []);

    const handlePeriodChange: SelectChangeEventHandler = useCallback(({ target }) => {
        setPeriodIfPossible(target.value);
    }, [setPeriodIfPossible]);

    const handleSortChange: SelectChangeEventHandler = useCallback(({ target }) => {
        setSortIfPossible(target.value);
    }, [setSortIfPossible]);

    const handleSubmit = useCallback(() => {
        const urlSearchParams = new URLSearchParams(searchParams);

        urlSearchParams.set(SEARCH_PARAMS.PERIOD, settings.period);
        urlSearchParams.set(SEARCH_PARAMS.SORT, settings.sort);

        setSearchParams(urlSearchParams);
    }, [searchParams, setSearchParams, settings.period, settings.sort]);

    return {
        handlePeriodChange,
        handleSortChange,
        handleSubmit,
        settings,
    };
};
