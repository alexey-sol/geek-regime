import React from "react";

import { fireEvent, render, screen } from "@/test/setup";

import { BaseIconButton, type BaseIconButtonProps } from "./base-icon-button";

const ICON_STUB = "icon-stub";
const Icon = () => <svg>{ICON_STUB}</svg>;
const onClick = jest.fn();

const Wrap = (props: Partial<BaseIconButtonProps>) => (
    <BaseIconButton
        icon={Icon}
        onClick={onClick}
        {...props}
    />
);

describe("Shared/BaseIconButton", () => {
    test("renders icon", () => {
        render(<Wrap />);

        screen.getByText(ICON_STUB);
    });

    test("calls onClick when clicked", () => {
        render(<Wrap />);

        fireEvent.click(screen.getByRole("button"));

        expect(onClick).toBeCalled();
    });

    test("not calls onClick when clicked if disabled is provided", () => {
        render(<Wrap disabled />);

        fireEvent.click(screen.getByRole("button"));

        expect(onClick).not.toBeCalled();
    });
});
