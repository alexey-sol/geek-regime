import React, {
    memo,
    useCallback,
    useMemo,
    type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";

import { defaults } from "@/shared/const";
import { Tooltip } from "@/shared/components/tooltip";

import { usePagingData } from "./utils";
import {
    StepButtonsWrapStyled,
    StepButtonStyled,
    PageNumbersWrapStyled,
    PagingButtonStyled,
    PagingStyled,
    SpillStyled,
    LeapButtonStyled,
    LeapButtonsWrapStyled,
} from "./style";
import * as cn from "./const";
import type { UsePagingDataArg } from "./types";

const { START_PAGE } = defaults;
const MIN_PAGE_COUNT_TO_SHOW_SPILLS = 3;

export type PagingProps = Partial<UsePagingDataArg>;

export const Paging = memo(({
    page = START_PAGE,
    pageNeighbours = 4,
    pathPrefix = "",
    size = defaults.PAGE_SIZE,
    totalElements = 0,
}: PagingProps) => {
    const { t } = useTranslation();

    const {
        goToPage,
        hasLeftSpill,
        hasRightSpill,
        isMinifiedView,
        lastPage,
        pagesRange,
    } = usePagingData({
        page,
        pageNeighbours,
        pathPrefix,
        size,
        totalElements,
    });

    const hasLeapButtons = MIN_PAGE_COUNT_TO_SHOW_SPILLS <= lastPage;
    const isStartPage = page === START_PAGE;
    const isLastPage = page === lastPage;

    const toPreviousPage = useCallback(() => goToPage(page - 1), [goToPage, page]);
    const toNextPage = useCallback(() => goToPage(page + 1), [goToPage, page]);
    const toStartPage = useCallback(() => goToPage(START_PAGE), [goToPage]);
    const toLastPage = useCallback(() => goToPage(lastPage), [goToPage, lastPage]);

    const pageNumberItems = useMemo(() => {
        const items: ReactNode[] = [];

        if (hasLeftSpill && !isMinifiedView) {
            items.push(
                <React.Fragment key={START_PAGE}>
                    <li>
                        <PagingButtonStyled
                            active={isStartPage}
                            aria-label={cn.ARIA_LABEL_START_PAGE}
                            onClick={toStartPage}
                            view="secondary"
                        >
                            {START_PAGE}
                        </PagingButtonStyled>
                    </li>

                    <li><SpillStyled /></li>
                </React.Fragment>,
            );
        }

        pagesRange.forEach((pageNumber) => items.push(
            <li key={pageNumber}>
                <PagingButtonStyled
                    active={pageNumber === page}
                    aria-current={pageNumber === page ? "page" : undefined}
                    aria-label={cn.ARIA_LABEL_PAGE_NUMBER}
                    onClick={() => goToPage(pageNumber)}
                    view="secondary"
                >
                    {pageNumber}
                </PagingButtonStyled>
            </li>,
        ));

        if (hasRightSpill && !isMinifiedView) {
            items.push(
                <React.Fragment key={lastPage}>
                    <li><SpillStyled /></li>

                    <li>
                        <PagingButtonStyled
                            active={isLastPage}
                            aria-label={cn.ARIA_LABEL_LAST_PAGE}
                            onClick={toLastPage}
                            view="secondary"
                        >
                            {lastPage}
                        </PagingButtonStyled>
                    </li>
                </React.Fragment>,
            );
        }

        return items;
    }, [goToPage, hasLeftSpill, hasRightSpill, isLastPage, isMinifiedView, isStartPage,
        lastPage, page, pagesRange, toLastPage, toStartPage]);

    if (totalElements === 0) {
        return null;
    }

    return (
        <PagingStyled aria-label={cn.ARIA_LABEL_PAGING}>
            {isMinifiedView && hasLeapButtons && (
                <LeapButtonsWrapStyled>
                    <li>
                        <Tooltip
                            disabled={!hasLeftSpill}
                            message={`${t("shared.paging.leapButton.toStart.tooltip")} 1`}
                        >
                            <LeapButtonStyled
                                aria-label={cn.ARIA_LABEL_START_PAGE}
                                disabled={!hasLeftSpill}
                                onClick={toStartPage}
                            >
                                {t("shared.paging.leapButton.toStart.title")}
                            </LeapButtonStyled>
                        </Tooltip>
                    </li>

                    <li>
                        <Tooltip
                            disabled={!hasRightSpill}
                            message={`${t("shared.paging.leapButton.toEnd.tooltip")} ${lastPage}`}
                        >
                            <LeapButtonStyled
                                aria-label={cn.ARIA_LABEL_LAST_PAGE}
                                disabled={!hasRightSpill}
                                onClick={toLastPage}
                            >
                                {t("shared.paging.leapButton.toEnd.title")}
                            </LeapButtonStyled>
                        </Tooltip>
                    </li>
                </LeapButtonsWrapStyled>
            )}

            <StepButtonsWrapStyled>
                <section>
                    <Tooltip
                        disabled={isStartPage}
                        message={t("shared.paging.stepButton.previous.tooltip")}
                    >
                        <StepButtonStyled
                            aria-label={cn.ARIA_LABEL_PREVIOUS_PAGE}
                            disabled={isStartPage}
                            fontSize="xl"
                            onClick={toPreviousPage}
                            view="secondary"
                        >
                            &laquo;
                        </StepButtonStyled>
                    </Tooltip>
                </section>

                <PageNumbersWrapStyled>
                    {pageNumberItems}
                </PageNumbersWrapStyled>

                <section>
                    <Tooltip
                        disabled={isLastPage}
                        message={t("shared.paging.stepButton.next.tooltip")}
                    >
                        <StepButtonStyled
                            aria-label={cn.ARIA_LABEL_NEXT_PAGE}
                            disabled={isLastPage}
                            fontSize="xl"
                            onClick={toNextPage}
                            view="secondary"
                        >
                            &raquo;
                        </StepButtonStyled>
                    </Tooltip>
                </section>
            </StepButtonsWrapStyled>
        </PagingStyled>
    );
});
