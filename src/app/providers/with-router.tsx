import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Loader } from "@/shared/components/loader";

export const withRouter = (component: () => JSX.Element) => () => (
    <React.StrictMode>
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                {component()}
            </Suspense>
        </BrowserRouter>
    </React.StrictMode>
);
