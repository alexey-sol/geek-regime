import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useNavigate } from "react-router";
import { useTheme } from "styled-components";

import { range } from "@/shared/utils/helpers/range";
import { defaults } from "@/shared/const";
import { useWindowSize } from "@/shared/utils/hooks/use-window-size";

import type { PagingData, UsePagingDataArg } from "./types";

const START_PAGE = defaults.PAGING_PAGE;

enum SpillCount {
    DEFAULT = 2,
    NONE = 0
}

export const usePagingData = ({
    page = defaults.PAGING_PAGE,
    pageNeighbours = 4,
    pathPrefix = "",
    qs = "",
    size = defaults.PAGING_SIZE,
    totalElements,
}: UsePagingDataArg): PagingData => {
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

    const goToPage = useCallback<PagingData["goToPage"]>((selectedPage) => {
        if (selectedPage === page) {
            return;
        }

        const path = (!qs && selectedPage === START_PAGE)
            ? `${pathPrefix}/`
            : `${pathPrefix}/page-${selectedPage}${qs}`;

        navigate(path);
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
