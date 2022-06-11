import React from "react";
import { createRoot } from "react-dom/client";
import * as documentConst from "@/const/document";
import { App } from "@/features/app";

const rootElement = document.getElementById(documentConst.ROOT_ELEMENT_ID);

if (!rootElement) {
    throw new Error(`No root element with id = "${documentConst.ROOT_ELEMENT_ID}" found`);
}

const root = createRoot(rootElement);
root.render(<App />);
