import React, { Component, type PropsWithChildren, type ReactNode } from "react";

import { Typography } from "../typography";

export type ErrorBoundaryState = {
    error: Error | null;
};

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        error: null,
    };

    static getDerivedStateFromError(error: Error): { error: Error } {
        return { error };
    }

    static renderErrorMessage(): ReactNode {
        return ( // TODO
            <Typography>
                Простите, на странице что-то поломалось.
            </Typography>
        );
    }

    componentDidCatch(error: Error): void {
        console.error(error);
    }

    render(): ReactNode {
        const { error } = this.state;
        const { children } = this.props;

        return (error)
            ? ErrorBoundary.renderErrorMessage()
            : children;
    }
}
