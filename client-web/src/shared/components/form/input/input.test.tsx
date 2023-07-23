import React, { type FC } from "react";

import { fireEvent, render, screen } from "@/test/setup";

import { Input, InputProps } from "./input";

const NAME = "name";
const onChange = jest.fn();

const InputWrap: FC<Partial<InputProps>> = (props) => (
    <Input name={NAME} {...props} />
);

describe("Shared/Input", () => {
    test("renders label", () => {
        const label = "Label";

        render(<InputWrap label={label} />);

        screen.getByText(label);
    });

    test("renders hint", () => {
        const hint = "Hint";

        render(<InputWrap label={hint} />);

        screen.getByText(hint);
    });

    test("renders label", () => {
        const value = "Oh hi Mark";

        render(<InputWrap onChange={onChange} role="textbox" />);

        const input = screen.getByRole("textbox");

        fireEvent.change(input, {
            target: { value },
        });

        screen.getByDisplayValue(value);
        expect(onChange).toBeCalled();
    });
});
