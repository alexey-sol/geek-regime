import { dom } from "@/shared/const";

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

export class RootElementNotFoundError extends Error {
    constructor(message = `No root element with id = "${dom.ROOT_ELEMENT_ID}" found`) {
        super(message);
    }
}
