export class ContextOutsideProviderError extends Error {
    constructor(contextName = "The context") {
        super(`${contextName} must be used within the relevant provider`);
    }
}

export class IllegalArgumentError extends Error {
    constructor(message = "Illegal arguments are provided") {
        super(message);
    }
}
