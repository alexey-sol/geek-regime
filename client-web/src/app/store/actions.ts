import { createAction } from "@reduxjs/toolkit";

import { type SnackbarArg } from "@/features/feedback/models/entities";

export const notify = createAction("notify", (payload: SnackbarArg) => ({
    payload,
}));
