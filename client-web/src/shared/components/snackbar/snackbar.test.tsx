import React from "react";

import { fireEvent, render, screen } from "@/test/setup";
import * as iconButtonCn from "@/shared/components/icon-button/const";

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
        render(<Snackbar message={MESSAGE} onClose={onClose} />);

        fireEvent.click(screen.getByLabelText(iconButtonCn.ARIA_LABEL_CLOSE));

        expect(onClose).toBeCalled();
    });

    test("calls onClose on timer", () => {
        render(<Snackbar message={MESSAGE} onClose={onClose} />);

        jest.runAllTimers();

        expect(onClose).toBeCalled();
    });
});
