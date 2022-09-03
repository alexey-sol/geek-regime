import React from "react";
import { createRoot } from "react-dom/client";
import { AppWithProviders } from "@/app";
import { dom } from "@/shared/const";

const rootElement = document.getElementById(dom.ROOT_ELEMENT_ID);

if (!rootElement) {
    throw new Error(`No root element with id = "${dom.ROOT_ELEMENT_ID}" found`);
}

const root = createRoot(rootElement);

root.render(<AppWithProviders />);
