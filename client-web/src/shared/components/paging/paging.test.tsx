import React from "react";
import * as router from "react-router";

import { fireEvent, render, screen } from "@/test/setup";

import { Paging } from "./paging";
import * as cn from "./const";

const getPageNumberCount = (neighbours: number) => {
    const timesTwo = 2;
    return neighbours * timesTwo - 1;
};

const SIZE = 10;
const PAGE_COUNT = 50;

const navigate = jest.fn();
jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

describe("Shared/Paging", () => {
    const minNeighbours = 2;
    const maxNeighbours = 20;
    const minItems = 100;

    for (
        let neighbours = minNeighbours, items = minItems;
        neighbours < maxNeighbours;
        neighbours += 1, items *= 2
    ) {
        test(`renders page number count equal ${getPageNumberCount(neighbours)}`, () => {
            render(<Paging
                pageNeighbours={neighbours}
                size={SIZE}
                totalItems={items}
            />);

            const pageNumbers = screen.queryAllByLabelText(cn.ARIA_LABEL_PAGE_NUMBER);
            expect(pageNumbers.length).toEqual(getPageNumberCount(neighbours));
        });
    }

    test("renders element if has items", () => {
        render(<Paging totalItems={1} />);

        const element = screen.queryByLabelText(cn.ARIA_LABEL_PAGING);
        expect(element).toBeInTheDocument();
    });

    test("renders nothing if has no items", () => {
        render(<Paging totalItems={0} />);

        const element = screen.queryByLabelText(cn.ARIA_LABEL_PAGING);
        expect(element).not.toBeInTheDocument();
    });

    test("renders only one page if it accommodates all items", () => {
        render(<Paging
            size={SIZE}
            totalItems={SIZE}
        />);

        const pageNumbers = screen.queryAllByLabelText(cn.ARIA_LABEL_PAGE_NUMBER);
        expect(pageNumbers.length).toEqual(1);
    });

    test("renders more than one page if it doesn't accommodate all items", () => {
        render(<Paging
            size={SIZE}
            totalItems={SIZE + 1}
        />);

        const pageNumbers = screen.queryAllByLabelText(cn.ARIA_LABEL_PAGE_NUMBER);
        expect(pageNumbers.length).toBeGreaterThan(1);
    });

    test("renders current page active", () => {
        const page = 3;

        render(<Paging
            page={page}
            size={SIZE}
            totalItems={SIZE * 10}
        />);

        const pageNumbers = screen.queryAllByLabelText(cn.ARIA_LABEL_PAGE_NUMBER);

        pageNumbers.forEach((number, index) => {
            const currentPage = index + 1;

            if (currentPage === page) {
                expect(number).toHaveAttribute("aria-current", "page");
            } else {
                expect(number).not.toHaveAttribute("aria-current", "page");
            }
        });
    });

    test("renders last page when right page overflow", () => {
        render(<Paging
            page={1}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        screen.getByLabelText(cn.ARIA_LABEL_LAST_PAGE);
    });

    test("renders start page when left page overflow", () => {
        render(<Paging
            page={PAGE_COUNT}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        screen.getByLabelText(cn.ARIA_LABEL_START_PAGE);
    });

    test("renders previous page disabled and next page not disabled, if page is start one", () => {
        render(<Paging
            page={1}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        const previousPage = screen.getByLabelText(cn.ARIA_LABEL_PREVIOUS_PAGE);
        expect(previousPage).toBeDisabled();

        const nextPage = screen.getByLabelText(cn.ARIA_LABEL_NEXT_PAGE);
        expect(nextPage).not.toBeDisabled();
    });

    test("renders next page disabled and previous page not disabled, if page is last one", () => {
        render(<Paging
            page={PAGE_COUNT}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        const nextPage = screen.getByLabelText(cn.ARIA_LABEL_NEXT_PAGE);
        expect(nextPage).toBeDisabled();

        const previousPage = screen.getByLabelText(cn.ARIA_LABEL_PREVIOUS_PAGE);
        expect(previousPage).not.toBeDisabled();
    });

    test("navigates to clicked page", () => {
        render(<Paging
            page={1}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        fireEvent.click(screen.getByLabelText(cn.ARIA_LABEL_LAST_PAGE));

        expect(navigate).toBeCalledWith(`/page-${PAGE_COUNT}`);
    });

    test("not navigates to same page", () => {
        render(<Paging
            page={1}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        const startPage = screen.getAllByLabelText(cn.ARIA_LABEL_PAGE_NUMBER)[0];
        fireEvent.click(startPage);

        expect(navigate).not.toBeCalled();
    });

    test("navigates to next page", () => {
        const page = 1;

        render(<Paging
            page={page}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        fireEvent.click(screen.getByLabelText(cn.ARIA_LABEL_NEXT_PAGE));

        expect(navigate).toBeCalledWith(`/page-${page + 1}`);
    });

    test("navigates to previous page", () => {
        const page = PAGE_COUNT;

        render(<Paging
            page={page}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        fireEvent.click(screen.getByLabelText(cn.ARIA_LABEL_PREVIOUS_PAGE));

        expect(navigate).toBeCalledWith(`/page-${page - 1}`);
    });

    test("navigates to page with query string", () => {
        const qs = "?key=value";
        const page = 1;

        render(<Paging
            qs={qs}
            page={page}
            size={SIZE}
            totalItems={SIZE * PAGE_COUNT}
        />);

        fireEvent.click(screen.getByLabelText(cn.ARIA_LABEL_NEXT_PAGE));

        expect(navigate).toBeCalledWith(`/page-${page + 1}${qs}`);
    });
});
