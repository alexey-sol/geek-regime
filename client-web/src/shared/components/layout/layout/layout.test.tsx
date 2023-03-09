import React from "react";

import { render, screen } from "@/test/setup";
import type { SnackbarArg } from "@/features/feedback/models/entities";

import { Layout } from "./layout";
import * as ut from "./utils";

const data: ut.LayoutData = {
    resetSnackbar: jest.fn(),
};

const spyOnUseLayoutData = (result?: Partial<ut.LayoutData>) =>
    jest.spyOn(ut, "useLayoutData").mockImplementation(() => ({ ...data, ...result }));

describe("Shared/Layout", () => {
    test("renders snackbar if it's provided", () => {
        const snackbar: SnackbarArg = { message: "Message" };

        spyOnUseLayoutData({ snackbar });

        render(<Layout>{null}</Layout>);

        screen.getByText(snackbar.message);
    });
});
