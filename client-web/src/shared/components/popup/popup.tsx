import React, { type FC, useRef } from "react";
import ReactDOM from "react-dom";

import { CloseIconButton } from "@/shared/components/icon-button";
import { Typography } from "@/shared/components/typography";
import { getRootElement } from "@/shared/utils/helpers/dom";
import { usePopupData } from "@/shared/components/popup/utils";
import type { PopupArg } from "@/features/feedback/models/entities";

import { PopupStyled } from "./style";

export type PopupProps = Pick<PopupArg, "message" | "view"> & {
    durationMs?: number;
    onClose: () => void;
};

export const Popup: FC<PopupProps> = ({
    durationMs = 10000,
    message,
    onClose,
    ...rest
}) => {
    const elementRef = useRef<HTMLElement>(null);

    usePopupData({
        durationMs,
        elementRef,
        onClose,
    });

    const container = getRootElement();

    const popupElement = (
        <PopupStyled ref={elementRef} {...rest}>
            <Typography>
                {message}
            </Typography>

            <CloseIconButton fontSize="smaller" onClick={onClose} />
        </PopupStyled>
    );

    return ReactDOM.createPortal(popupElement, container);
};
