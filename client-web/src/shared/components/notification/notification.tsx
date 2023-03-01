import React, { type FC, useRef } from "react";
import ReactDOM from "react-dom";

import { CloseIconButton } from "@/shared/components/icon-button";
import { Typography } from "@/shared/components/typography";
import { getRootElement } from "@/shared/utils/helpers/dom";
import { useNotificationData } from "@/shared/components/notification/utils";
import type { NotificationArg } from "@/features/feedback/models/entities";

import { NotificationStyled } from "./style";

export type NotificationProps = Pick<NotificationArg, "message" | "view"> & {
    durationMs?: number;
    onClose: () => void;
};

export const Notification: FC<NotificationProps> = ({
    durationMs = 10000,
    message,
    onClose,
    ...rest
}) => {
    const elementRef = useRef<HTMLElement>(null);

    useNotificationData({
        durationMs,
        elementRef,
        onClose,
    });

    const container = getRootElement();

    const notification = (
        <NotificationStyled ref={elementRef} {...rest}>
            <Typography>
                {message}
            </Typography>

            <CloseIconButton fontSize="smaller" onClick={onClose} />
        </NotificationStyled>
    );

    return ReactDOM.createPortal(notification, container);
};
