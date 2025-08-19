import React from "react";

import { Link } from "./link";

import { render, screen } from "@/test/setup";

const TITLE = "Link";

describe("Link", () => {
    test('renders link equal to "to" prop', () => {
        const to = "/oh-hi-mark";

        render(<Link to={to}>{TITLE}</Link>);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", to);
    });
});
