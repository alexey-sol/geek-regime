import "@testing-library/jest-dom";
import "reflect-metadata";
import "whatwg-fetch";

import React, {
    type FC,
    type PropsWithChildren,
    type ReactElement,
} from "react";

import {
    render,
    Wrap as BaseWrap,
    type RenderOptions,
    type RenderResult,
} from "@/test/setup";

export const Wrap: FC<PropsWithChildren> = ({ children }) => (
    <BaseWrap>
        {children}
    </BaseWrap>
);

const renderWithProviders = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "queries">,
): RenderResult => render(
    ui,
    {
        wrapper: Wrap,
        ...options,
    },
);

export * from "@testing-library/react";

export { renderWithProviders as render };
