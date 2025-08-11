import React, { type FC, useRef } from "react";
import ReactDOM from "react-dom";
import { CloseIconButton } from "@eggziom/geek-regime-js-ui-kit/components/icon-button";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";

import { SnackbarStyled } from "./style";

import { getRootElement } from "@/shared/utils/helpers/dom";
import { useSnackbarData } from "@/shared/components/snackbar/utils";
import type { SnackbarArg } from "@/features/feedback/models/entities";

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

            <CloseIconButton fontSize="xs" onClick={onClose} />
        </SnackbarStyled>
    );

    return ReactDOM.createPortal(snackbar, container);
};
