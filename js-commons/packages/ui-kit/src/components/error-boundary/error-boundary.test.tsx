import React from "react";

import { ErrorBoundary } from "./error-boundary";

import { render, screen } from "@/test/setup";

const SUCCESS_ELEMENT_ROLE = "article";

const Failure = () => {
    throw new Error();
};

const Success = () => <section role={SUCCESS_ELEMENT_ROLE} />;

describe("ErrorBoundary", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation(() => {});
    });

    it("renders errorMessage", () => {
        const errorMessage = "Oh hi Mark";

        render(
            <ErrorBoundary errorMessage={errorMessage}>
                <Failure />
            </ErrorBoundary>,
        );

        screen.getByText(errorMessage);
    });

    it("calls onCatch", () => {
        const onCatch = jest.fn();

        render(
            <ErrorBoundary onCatch={onCatch}>
                <Failure />
            </ErrorBoundary>,
        );

        expect(onCatch).toBeCalled();
    });

    it("renders children, not element", () => {
        const errorMessage = "Oh hi Mark";
        const onCatch = jest.fn();

        render(
            <ErrorBoundary errorMessage={errorMessage}>
                <Success />
            </ErrorBoundary>,
        );

        screen.getByRole(SUCCESS_ELEMENT_ROLE);
        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        expect(onCatch).not.toBeCalled();
    });
});
