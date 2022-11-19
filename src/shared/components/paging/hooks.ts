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

import { UsePagingDataArgs } from "./types";

const startPage = defaults.PAGING_PAGE;

enum SpillElements {
    DEFAULT = 2,
    NONE = 0
}

export const usePagingData = ({
    page = defaults.PAGING_PAGE,
    pageNeighbours = 4,
    pathPrefix = "",
    qs = "",
    setPage,
    size = defaults.PAGING_SIZE,
    totalItems,
}: UsePagingDataArgs) => {
    const [spillElements, setSpillElements] = useState(SpillElements.DEFAULT);

    const theme = useTheme();
    const navigate = useNavigate();
    const windowSize = useWindowSize();

    const largeScreenWidth = parseInt(theme.breakpoints.lg, 10);
    const isMinifiedView = windowSize.width < largeScreenWidth;

    useEffect(() => {
        setSpillElements((isMinifiedView)
            ? SpillElements.NONE
            : SpillElements.DEFAULT);
    }, [isMinifiedView]);

    const lastPage = Math.ceil(totalItems / size);
    const visiblePages = (pageNeighbours * 2) + 1;

    const leftmostVisiblePage = page - pageNeighbours;
    const rightmostVisiblePage = page + pageNeighbours;

    const hasSpills = lastPage > visiblePages;
    const hasLeftSpill = hasSpills && leftmostVisiblePage > 1;
    const hasRightSpill = hasSpills && rightmostVisiblePage < lastPage;

    const goToPage = useCallback((selectedPage: number) => {
        if (selectedPage === page) {
            return;
        }

        const path = (!qs && selectedPage === startPage)
            ? `${pathPrefix}/`
            : `${pathPrefix}/page-${selectedPage}${qs}`;

        setPage(selectedPage);
        navigate(path);
    }, [navigate, page, pathPrefix, qs, setPage]);

    const getStartNumber = useCallback(() => {
        const shouldOffsetLeftNeighbours = pageNeighbours * 2 > lastPage - leftmostVisiblePage;
        const absentRightNeighbours = page - lastPage + pageNeighbours;

        const resultLeftmostPage = (shouldOffsetLeftNeighbours)
            ? leftmostVisiblePage - absentRightNeighbours
            : leftmostVisiblePage;

        const startNumber = Math.max(startPage, resultLeftmostPage);

        return (hasLeftSpill)
            ? startNumber + spillElements
            : startNumber;
    }, [hasLeftSpill, lastPage, leftmostVisiblePage, page, pageNeighbours, spillElements]);

    const getEndNumber = useCallback(() => {
        const pagesBeforePivot = (hasLeftSpill) ? pageNeighbours : page - 1;
        const pagesAfterPivot = visiblePages - pagesBeforePivot - 1;

        const resultRightmostPage = page + pagesAfterPivot;

        const endNumber = Math.min(lastPage, resultRightmostPage);

        return (hasRightSpill)
            ? endNumber - spillElements
            : endNumber;
    }, [hasLeftSpill, hasRightSpill, lastPage, page, pageNeighbours, visiblePages,
        spillElements]);

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
