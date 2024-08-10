import React from "react";

import { render, screen } from "@test/setup";

import { Link } from "./link";

const TITLE = "Link";

describe("Link", () => {
    test("renders link equal to \"to\" prop", () => {
        const to = "/oh-hi-mark";

        render(<Link to={to}>{TITLE}</Link>);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", to);
    });
});
