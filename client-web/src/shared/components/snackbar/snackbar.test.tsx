import React from "react";

import { fireEvent, render, screen } from "@/test/setup";

import { Snackbar } from "./snackbar";

const MESSAGE = "Message";
const onClose = jest.fn();

describe("Shared/Snackbar", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("renders message", () => {
        render(<Snackbar message={MESSAGE} onClose={onClose} />);

        screen.getByText(MESSAGE);
    });

    test("calls onClose when close button is clicked", () => {
        const ARIA_LABEL_CLOSE = "close";

        render(<Snackbar message={MESSAGE} onClose={onClose} />);

        fireEvent.click(screen.getByLabelText(ARIA_LABEL_CLOSE));

        expect(onClose).toBeCalled();
    });

    test("calls onClose on timer", () => {
        render(<Snackbar message={MESSAGE} onClose={onClose} />);

        jest.runAllTimers();

        expect(onClose).toBeCalled();
    });
});
