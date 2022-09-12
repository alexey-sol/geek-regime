import React, { Component, ReactNode } from "react";

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
            <section>
                Простите, на странице что-то поломалось.
            </section>
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
