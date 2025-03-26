import { ChangeEventHandler, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SEARCH_PARAMS } from "@/shared/const";
import { type PostSortValue, type PostsPageSettings } from "@/features/posts/types";
import { isPeriodValue, isSortValue } from "@/features/posts/utils/guards";
import { usePostSearchParams } from "@/features/posts/utils/hooks/use-post-search-params";
import { type PostPagePeriod } from "@/features/posts/models/dtos";

const INITIAL_PERIOD: PostPagePeriod = "OVERALL";
const INITIAL_SORT: PostSortValue = "LATEST";

type SettingSetter = (value: string) => void;

type SelectChangeEventHandler = ChangeEventHandler<{ value: string }>;

type UsePageSettingsResult = {
    handlePeriodChange: SelectChangeEventHandler;
    handleSortChange: SelectChangeEventHandler;
    handleSubmit: () => void;
    settings: PostsPageSettings;
};

export const usePageSettings = (): UsePageSettingsResult => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        period: initialPeriod = INITIAL_PERIOD,
        sort: initialSort = INITIAL_SORT,
    } = usePostSearchParams();

    const [settings, setSettings] = useState<PostsPageSettings>({
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
