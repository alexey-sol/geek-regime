import React from "react";

import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { defaults } from "@/shared/const";
import { range } from "@/shared/utils/helpers/range";
import {
    StepButtonsWrapStyled,
    StepButtonStyled,
    PageNumbersWrapStyled,
    PagingButtonStyled,
    PagingStyled,
    LeapButtonStyled,
    LeapButtonsWrapStyled,
} from "./style";

const maxPageCountWithoutLeapButtons = 2;

export type PagingProps = {
    page?: number;
    pageNeighbours?: number;
    pathPrefix?: string;
    qs?: string;
    setPage: any;
    size?: number;
    totalItems: number;
};

export const Paging = ({
    page = defaults.PAGING_PAGE,
    pageNeighbours = 4,
    pathPrefix = "",
    qs = "",
    setPage,
    size = defaults.PAGING_SIZE,
    totalItems,
}: PagingProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const lastPage = Math.ceil(totalItems / size);
    const visiblePages = (pageNeighbours * 2) + 1;

    const leftmostVisiblePage = page - pageNeighbours;
    const rightmostVisiblePage = page + pageNeighbours;

    const hasSpills = lastPage > visiblePages;
    const hasLeftSpill = hasSpills && leftmostVisiblePage > 1;
    const hasRightSpill = hasSpills && rightmostVisiblePage < lastPage;

    const handlePageChange = (selectedPage: number) => {
        if (selectedPage === page) {
            return;
        }

        const path = (!qs && selectedPage === 1)
            ? `${pathPrefix}/`
            : `${pathPrefix}/page-${selectedPage}${qs}`;

        setPage(selectedPage);
        navigate(path);
    };

    const goToPage = (selectedPage: number) => {
        handlePageChange(Math.max(0, Math.min(selectedPage, lastPage)));
    };

    const getPagesRange = () => {
        const pagesBeforePivot = (hasLeftSpill) ? pageNeighbours : page - 1;
        const pagesAfterPivot = visiblePages - pagesBeforePivot - 1;

        const shouldOffsetLeftNeighbours = pageNeighbours * 2 > lastPage - leftmostVisiblePage;
        const absentRightNeighbours = page - lastPage + pageNeighbours;

        const leftmostVisiblePageWithOffset = (shouldOffsetLeftNeighbours)
            ? leftmostVisiblePage - absentRightNeighbours
            : leftmostVisiblePage;

        const startNumber = Math.max(1, leftmostVisiblePageWithOffset);
        const endNumber = Math.min(lastPage, page + pagesAfterPivot);

        return range(startNumber, endNumber);
    };

    const pagesRange = getPagesRange();

    const isStartPage = page === 1;
    const isLastPage = page === lastPage;

    const toPreviousPage = () => goToPage(page - 1);
    const toNextPage = () => goToPage(page + 1);
    const toStartPage = () => goToPage(1);
    const toLastPage = () => goToPage(lastPage);

    const shouldShowLeapButtons = maxPageCountWithoutLeapButtons < lastPage;

    const pageNumberItems = pagesRange.map((pageNumber) => (
        <li key={pageNumber}>
            <PagingButtonStyled
                active={pageNumber === page}
                onClick={() => goToPage(pageNumber)}
                variation="secondary"
            >
                {pageNumber}
            </PagingButtonStyled>
        </li>
    ));

    return (
        <PagingStyled>
            {shouldShowLeapButtons && (
                <LeapButtonsWrapStyled>
                    <li>
                        <LeapButtonStyled
                            disabled={!hasLeftSpill}
                            onClick={toStartPage}
                            title={`${t("paging.leapButton.toStart.title")} 1`}
                            variation="transparent"
                        >
                            {t("paging.leapButton.toStart.text")}
                        </LeapButtonStyled>
                    </li>

                    <li>
                        <LeapButtonStyled
                            disabled={!hasRightSpill}
                            onClick={toLastPage}
                            title={`${t("paging.leapButton.toEnd.title")} ${lastPage}`}
                            variation="transparent"
                        >
                            {t("paging.leapButton.toEnd.text")}
                        </LeapButtonStyled>
                    </li>
                </LeapButtonsWrapStyled>
            )}

            <StepButtonsWrapStyled>
                <section>
                    <StepButtonStyled
                        disabled={isStartPage}
                        onClick={toPreviousPage}
                        size="larger"
                        title={t("paging.stepButton.previous.title")}
                        variation="secondary"
                    >
                        &laquo;
                    </StepButtonStyled>
                </section>

                <PageNumbersWrapStyled>
                    {pageNumberItems}
                </PageNumbersWrapStyled>

                <section>
                    <StepButtonStyled
                        disabled={isLastPage}
                        onClick={toNextPage}
                        size="larger"
                        title={t("paging.stepButton.next.title")}
                        variation="secondary"
                    >
                        &raquo;
                    </StepButtonStyled>
                </section>
            </StepButtonsWrapStyled>
        </PagingStyled>
    );
};
