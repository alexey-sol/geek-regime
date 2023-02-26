import React from "react";

import { render, screen } from "@/test/setup";
import type { NotificationArg } from "@/features/feedback/models/entities";

import { Layout } from "./layout";
import * as ut from "./utils";

const data: ut.LayoutData = {
    resetNotification: jest.fn(),
};

const spyOnUseLayoutData = (result?: Partial<ut.LayoutData>) =>
    jest.spyOn(ut, "useLayoutData").mockImplementation(() => ({ ...data, ...result }));

describe("Shared/Layout", () => {
    test("renders notification if it's provided", () => {
        const notification: NotificationArg = { message: "Message" };

        spyOnUseLayoutData({ notification });

        render(<Layout>{null}</Layout>);

        screen.getByText(notification.message);
    });
});
