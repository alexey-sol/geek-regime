import React from "react";

import { fireEvent, render, screen } from "@test/setup";

import { Button } from "./button";

const TITLE = "Button";
const onClick = jest.fn();

describe("Button", () => {
    test("calls onClick when clicked", () => {
        render(<Button onClick={onClick}>{TITLE}</Button>);

        fireEvent.click(screen.getByRole("button"));

        expect(onClick).toBeCalled();
    });

    test("not calls onClick when clicked if disabled is provided", () => {
        render(<Button disabled onClick={onClick}>{TITLE}</Button>);

        fireEvent.click(screen.getByRole("button"));

        expect(onClick).not.toBeCalled();
    });

    test("renders icon", () => {
        const iconStub = "icon-stub";
        const Icon = () => <svg>{iconStub}</svg>;

        render(<Button icon={Icon}>{TITLE}</Button>);

        screen.getByText(iconStub);
    });
});
