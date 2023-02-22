import React from "react";

import { fireEvent, render, screen } from "@/test/setup";
import * as iconButtonCn from "@/shared/components/icon-button/const";

import { Popup } from "./popup";

const MESSAGE = "Message";
const onClose = jest.fn();

describe("Shared/Popup", () => {
    test("renders message", () => {
        render(<Popup message={MESSAGE} onClose={onClose} />);

        screen.getByText(MESSAGE);
    });

    test("calls onClose when close button is clicked", () => {
        render(<Popup message={MESSAGE} onClose={onClose} />);

        fireEvent.click(screen.getByLabelText(iconButtonCn.ARIA_LABEL_CLOSE));

        expect(onClose).toBeCalled();
    });
});
