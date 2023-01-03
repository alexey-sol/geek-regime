import "reflect-metadata";
import React from "react";
import { createRoot } from "react-dom/client";

import { AppWithProviders } from "@/app";
import { RootElementNotFoundError } from "@/shared/utils/errors";
import { dom } from "@/shared/const";

import "./config/i18n";

const rootElement = document.getElementById(dom.ROOT_ELEMENT_ID);

if (!rootElement) {
    throw new RootElementNotFoundError();
}

const root = createRoot(rootElement);

root.render(<AppWithProviders />);
