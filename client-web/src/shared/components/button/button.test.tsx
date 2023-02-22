import React from "react";

import { fireEvent, render, screen } from "@/test/setup";

import { Button, LinkButton } from "./button";

const TITLE = "Button";
const onClick = jest.fn();

describe("Shared/Button", () => {
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
        const Icon = () => <svg>{iconStub}</svg>

        render(<Button icon={Icon}>{TITLE}</Button>);

        screen.getByText(iconStub);
    });
});

describe("Shared/LinkButton", () => {
    test("renders link equal to \"to\" prop", () => {
        const to = "/oh-hi-mark";

        render(<LinkButton to={to}>{TITLE}</LinkButton>);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", to);
    });
});
