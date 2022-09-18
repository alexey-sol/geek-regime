import React from "react";

import { defaults } from "@/shared/const";
import { useNavigate } from "react-router";
import { range } from "@/shared/utils/helpers/range";

export type PagingProps = {
    count?: number;
    currentPage?: number;
    pageNeighbours?: number;
    pathPrefix?: string;
    qs?: string;
    setCurrentPage: any;
    totalRecords: number;
};

export const Paging = ({
    count = defaults.PAGING_SIZE,
    currentPage = defaults.PAGING_PAGE,
    pageNeighbours = 2,
    pathPrefix = "",
    qs = "",
    setCurrentPage,
    totalRecords,
}: PagingProps) => {
    const navigate = useNavigate();

    const lastNumber = Math.ceil(totalRecords / count);
    const totalNumbers = (pageNeighbours * 2) + 1;

    if (!totalRecords || lastNumber === 1) {
        return null;
    }

    const leftmostNumber = currentPage - pageNeighbours;
    const rightmostNumber = currentPage + pageNeighbours;

    const hasLeftSpill = leftmostNumber > 1;
    const hasRightSpill = rightmostNumber < lastNumber;

    const handlePageChange = (page: number) => {
        if (currentPage === page) {
            return;
        }

        const path = (!qs && page === 1)
            ? `${pathPrefix}/`
            : `${pathPrefix}/page-${page}${qs}`;

        setCurrentPage(page);
        navigate(path);
    };

    const goToPage = (pageNumber: number) => {
        const page = Math.max(0, Math.min(pageNumber, lastNumber));
        handlePageChange(page);
    };

    const getPagesRange = () => {
        const numbersBeforePivot = (hasLeftSpill) ? pageNeighbours : currentPage - 1;
        const numbersAfterPivot = totalNumbers - numbersBeforePivot - 1;

        const startNumber = Math.max(1, leftmostNumber);
        const endNumber = Math.min(lastNumber, currentPage + numbersAfterPivot);

        return range(startNumber, endNumber);
    };

    const pagesRange = getPagesRange();

    const isStartPage = currentPage === 1;
    const isLastPage = currentPage === lastNumber;

    const toPreviousPage = () => goToPage(currentPage - 1);
    const toNextPage = () => goToPage(currentPage + 1);

    const shouldShowSteps = lastNumber > 2;

    const numberItems = pagesRange.map((page) => (
        <li key={page}>
            <button
                onClick={() => goToPage(page)}
                type="button"
            >
                {page}
            </button>
        </li>
    ));

    return (
        <nav>
            {shouldShowSteps && (
                <ul>
                    <li>
                        <button
                            disabled={isStartPage}
                            onClick={toPreviousPage}
                            title="На предыдущую страницу"
                            type="button"
                        >
                            {" Назад"}
                        </button>
                    </li>

                    <li>
                        <button
                            disabled={isLastPage}
                            onClick={toNextPage}
                            title="На следующую страницу"
                            type="button"
                        >
                            {"Вперед "}
                        </button>
                    </li>
                </ul>
            )}

            <section>
                <div title="На первую страницу">
                    <button
                        disabled={!hasLeftSpill}
                        onClick={() => goToPage(1)}
                        type="button"
                    >
                        <span>&laquo;</span>
                    </button>
                </div>

                <ul>
                    {numberItems}
                </ul>

                <div title={`На последнюю страницу - ${lastNumber}`}>
                    <button
                        disabled={!hasRightSpill}
                        onClick={() => goToPage(lastNumber)}
                        type="button"
                    >
                        <span>&raquo;</span>
                    </button>
                </div>
            </section>
        </nav>
    );
};
