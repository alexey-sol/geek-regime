import React, { Component, type PropsWithChildren, type ReactNode } from "react";
import { defaults } from "@eggziom/geek-regime-js-utils";

import { Typography } from "../typography";

export type ErrorBoundaryProps = PropsWithChildren<{
    errorMessage?: string;
    onCatch?: (error: Error) => void;
}>;

export type ErrorBoundaryState = {
    error?: Error;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        error: undefined,
    };

    static getDerivedStateFromError(error: Error): { error: Error } {
        return { error };
    }

    static renderErrorMessage(errorMessage = defaults.ERROR_MESSAGE): ReactNode {
        return ( // TODO
            <Typography>
                {errorMessage}
            </Typography>
        );
    }

    componentDidCatch(error: Error): void {
        const { onCatch } = this.props;

        if (onCatch) {
            onCatch(error);
        }
    }

    render(): ReactNode {
        const { error } = this.state;
        const { children, errorMessage } = this.props;

        return (error)
            ? ErrorBoundary.renderErrorMessage(errorMessage)
            : children;
    }
}
