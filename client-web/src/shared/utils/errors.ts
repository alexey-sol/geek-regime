export class ContextOutsideProviderError extends Error {
    constructor(message = "The context must be used within the provider") {
        super(message);
    }
}

export class InvalidConfigError extends Error {
    constructor(message = "Given config is invalid") {
        super(message);
    }
}

export class IllegalArgumentError extends Error {
    constructor(message = "Illegal arguments are provided") {
        super(message);
    }
}
