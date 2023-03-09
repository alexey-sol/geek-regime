import React, { type FC, useRef } from "react";
import ReactDOM from "react-dom";

import { CloseIconButton } from "@/shared/components/icon-button";
import { Typography } from "@/shared/components/typography";
import { getRootElement } from "@/shared/utils/helpers/dom";
import { useSnackbarData } from "@/shared/components/snackbar/utils";
import type { SnackbarArg } from "@/features/feedback/models/entities";

import { SnackbarStyled } from "./style";

export type SnackbarProps = Pick<SnackbarArg, "message" | "view"> & {
    durationMs?: number;
    onClose: () => void;
};

export const Snackbar: FC<SnackbarProps> = ({
    durationMs = 10000,
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
        <SnackbarStyled ref={elementRef} {...rest}>
            <Typography>
                {message}
            </Typography>

            <CloseIconButton fontSize="smaller" onClick={onClose} />
        </SnackbarStyled>
    );

    return ReactDOM.createPortal(snackbar, container);
};
