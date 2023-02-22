import React from "react";

import { render, screen } from "@/test/setup";
import type { PopupArg } from "@/features/ui/models/entities";

import { Layout } from "./layout";
import * as ut from "./utils";

const data: ut.LayoutData = {
    resetPopup: jest.fn(),
};

const spyOnUseLayoutData = (result?: Partial<ut.LayoutData>) =>
    jest.spyOn(ut, "useLayoutData").mockImplementation(() => ({ ...data, ...result }));

describe("Shared/Layout", () => {
    test("renders popup if it's provided", () => {
        const popup: PopupArg = { message: "Message" };

        spyOnUseLayoutData({ popup });

        render(<Layout>{null}</Layout>);

        screen.getByText(popup.message);
    });
});