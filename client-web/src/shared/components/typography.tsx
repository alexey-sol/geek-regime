import React, { type FC } from "react";
import { Typography, type TypographyProps } from "@eggziom/geek-regime-js-ui-kit";

export const FieldErrorMessage: FC<TypographyProps> = (props) => (
    <Typography color="orange" fontSize="xs" {...props} />
);
