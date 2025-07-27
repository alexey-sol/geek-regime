import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useNavigate } from "react-router";
import { useTheme } from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useWindowSize } from "@eggziom/geek-regime-js-ui-kit";

import { range } from "@/shared/utils/helpers/range";
import { defaults } from "@/shared/const";

import { type PagingData, type UsePagingDataArg } from "./types";

const { START_PAGE } = defaults;

enum SpillCount {
    DEFAULT = 2,
    NONE = 0
}

export const usePagingData = ({
    page = defaults.START_PAGE,
    pageNeighbours = 4,
    pathPrefix = "",
    size = defaults.PAGE_SIZE,
    totalElements,
}: UsePagingDataArg): PagingData => {
    const [searchParams] = useSearchParams();
    const [spillCount, setSpillCount] = useState(SpillCount.DEFAULT);

    const theme = useTheme();
    const navigate = useNavigate();
    const windowSize = useWindowSize();

    const largeScreenWidth = parseInt(theme.breakpoints.lg, 10);
    const isMinifiedView = windowSize.width < largeScreenWidth;

    useEffect(() => {
        setSpillCount((isMinifiedView)
            ? SpillCount.NONE
            : SpillCount.DEFAULT);
    }, [isMinifiedView]);

    const lastPage = Math.ceil(totalElements / size);
    const visiblePages = (pageNeighbours * 2) + 1;

    const leftmostVisiblePage = page - pageNeighbours;
    const rightmostVisiblePage = page + pageNeighbours;

    const hasSpills = lastPage > visiblePages;
    const hasLeftSpill = hasSpills && leftmostVisiblePage > 1;
    const hasRightSpill = hasSpills && rightmostVisiblePage < lastPage;

    const qs = searchParams.toString();
    const goToPage = useCallback<PagingData["goToPage"]>((selectedPage) => {
        if (selectedPage === page) {
            return;
        }

        const pathname = selectedPage === START_PAGE
            ? pathPrefix
            : `${pathPrefix}/page-${selectedPage}`;

        navigate({
            pathname,
            search: qs,
        });
    }, [navigate, page, pathPrefix, qs]);

    const getStartNumber = useCallback(() => {
        const shouldOffsetLeftNeighbours = pageNeighbours * 2 > lastPage - leftmostVisiblePage;
        const absentRightNeighbours = page - lastPage + pageNeighbours;

        const resultLeftmostPage = (shouldOffsetLeftNeighbours)
            ? leftmostVisiblePage - absentRightNeighbours
            : leftmostVisiblePage;

        const startNumber = Math.max(START_PAGE, resultLeftmostPage);

        return (hasLeftSpill)
            ? startNumber + spillCount
            : startNumber;
    }, [hasLeftSpill, lastPage, leftmostVisiblePage, page, pageNeighbours, spillCount]);

    const getEndNumber = useCallback(() => {
        const pagesBeforePivot = (hasLeftSpill) ? pageNeighbours : page - 1;
        const pagesAfterPivot = visiblePages - pagesBeforePivot - 1;

        const resultRightmostPage = page + pagesAfterPivot;

        const endNumber = Math.min(lastPage, resultRightmostPage);

        return (hasRightSpill)
            ? endNumber - spillCount
            : endNumber;
    }, [hasLeftSpill, hasRightSpill, lastPage, page, pageNeighbours, visiblePages,
        spillCount]);

    const getPagesRange = useCallback(() =>
        range(getStartNumber(), getEndNumber()), [getEndNumber, getStartNumber]);

    const pagesRange = useMemo(() => getPagesRange(), [getPagesRange]);

    return useMemo(() => ({
        goToPage,
        hasLeftSpill,
        hasRightSpill,
        isMinifiedView,
        lastPage,
        pagesRange,
    }), [goToPage, hasLeftSpill, hasRightSpill, isMinifiedView, lastPage, pagesRange]);
};
