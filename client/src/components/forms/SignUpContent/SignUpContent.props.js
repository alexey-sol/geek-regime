import { bool, func, object } from "prop-types";

export const defaultProps = {
    currentUser: null,
    isPending: false,
    notification: null
};

export const propTypes = {
    currentUser: object,
    isPending: bool,
    notification: object,
    onClose: func.isRequired,
    onSignUpStart: func.isRequired
};
