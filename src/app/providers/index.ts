import { compose } from "@reduxjs/toolkit";
import React from "react";
import { withTheme } from "./with-theme";
import { withRouter } from "./with-router";
import { withStore } from "./with-store";

export const withProviders = compose<React.FunctionComponent>(
    withStore,
    withRouter,
    withTheme,
);
