import React, { Component, ReactNode } from "react";

import type { HasChildren } from "@/shared/types/props";

import { Typography } from "../typography";

export type ErrorBoundaryProps = HasChildren;

export type ErrorBoundaryState = {
    error: Error | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
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
