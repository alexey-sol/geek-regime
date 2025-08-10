export class ContextOutsideProviderError extends Error {
    constructor(contextName = "The context") {
        super(`${contextName} must be used within the relevant provider`);
    }
}
