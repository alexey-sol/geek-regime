import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { CloseIconButton } from "components/ui/IconButton";
import { HIDE_NOTIFICATION } from "utils/const/events";
import { defaultProps, propTypes } from "./Popup.props";
import classnames from "classnames";
import pubsub from "utils/pubsub";
import styles from "./Popup.module.scss";

Popup.defaultProps = defaultProps;
Popup.propTypes = propTypes;

function Popup ({
    onClose,
    text,
    theme,
    timeoutInMs
}) {
    const timerRef = useRef(null);

    const popupClassName = classnames(
        styles.container,
        styles[`${theme}Theme`]
    );

    useEffect(() => {
        if (timeoutInMs) {
            timerRef.current = setTimeout(onClose, timeoutInMs);
        }

        const onKeydown = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeydown);
        pubsub.subscribe(HIDE_NOTIFICATION, onClose);

        return () => {
            document.removeEventListener("keydown", onKeydown);
            pubsub.unsubscribe(HIDE_NOTIFICATION, onClose);

            if (timeoutInMs) {
                clearTimeout(timerRef.current);
            }
        };
    }, [onClose, timeoutInMs]);

    const tooltipElem = (
        <div className={popupClassName}>
            <span className={styles.text}>
                {text}
            </span>

            <CloseIconButton
                className={styles.closeIconButton}
                onClick={onClose}
                size={12}
                theme="dark"
            />
        </div>
    );

    return ReactDOM.createPortal(
        tooltipElem,
        document.body
    );
}

export default Popup;
