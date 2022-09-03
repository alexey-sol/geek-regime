import React from "react";
import { store } from "@/app/store";
import { Provider } from "react-redux";

export const withStore = (component: () => JSX.Element) => () => (
    <Provider store={store}>
        {component()}
    </Provider>
);
