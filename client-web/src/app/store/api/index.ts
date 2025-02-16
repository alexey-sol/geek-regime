import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_PREFIX } from "@/shared/const";

export const appApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: API_PREFIX }),
    endpoints: () => ({}),
    reducerPath: "appApi",
});
