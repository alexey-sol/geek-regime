import React, { type FC, useRef } from "react";
import ReactDOM from "react-dom";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { CloseIconButton } from "@/shared/components/icon-button";
import { getRootElement } from "@/shared/utils/helpers/dom";
import { useSnackbarData } from "@/shared/components/snackbar/utils";
import type { SnackbarArg } from "@/features/feedback/models/entities";

import { SnackbarStyled } from "./style";

const DEFAULT_DURATION_MS = 10_000;

export type SnackbarProps = Pick<SnackbarArg, "message" | "view"> & {
    durationMs?: number;
    onClose: () => void;
};

export const Snackbar: FC<SnackbarProps> = ({
    durationMs = DEFAULT_DURATION_MS,
    message,
    onClose,
    ...rest
}) => {
    const elementRef = useRef<HTMLElement>(null);

    useSnackbarData({
        durationMs,
        elementRef,
        onClose,
    });

    const container = getRootElement();

    const snackbar = (
        <SnackbarStyled ref={elementRef} role="alert" {...rest}>
            <Typography fontSize="sm">
                {message}
            </Typography>

            <CloseIconButton disabled fontSize="xs" onClick={onClose} />
        </SnackbarStyled>
    );

    return ReactDOM.createPortal(snackbar, container);
};
