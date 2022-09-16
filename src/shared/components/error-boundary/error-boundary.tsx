import React, { Component, ReactNode } from "react";
import { Typography } from "@/shared/components/typography";

export type ErrorBoundaryProps = {
    children: ReactNode;
}

export type ErrorBoundaryState = {
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        error: null,
    };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    static renderErrorMessage() {
        return ( // TODO
            <Typography>
                Простите, на странице что-то поломалось.
            </Typography>
        );
    }

    componentDidCatch(error: Error) {
        console.error(error);
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        return (error)
            ? ErrorBoundary.renderErrorMessage()
            : children;
    }
}
