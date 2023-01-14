import "reflect-metadata";
import React from "react";
import { createRoot } from "react-dom/client";

import { AppWithProviders } from "@/app";
import { getRootElement } from "@/shared/utils/helpers/dom";

import "./config/i18n";

const root = createRoot(getRootElement());

root.render(<AppWithProviders />);
