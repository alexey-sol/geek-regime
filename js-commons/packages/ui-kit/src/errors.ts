const CONTEXT_OUTSIDE_MESSAGE = "The context must be used within the provider";

export class ContextOutsideProviderError extends Error {
    constructor(message = CONTEXT_OUTSIDE_MESSAGE) {
        super(message);
    }
}
