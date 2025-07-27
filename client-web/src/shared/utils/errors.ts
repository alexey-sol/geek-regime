export class IllegalArgumentError extends Error {
    constructor(message = "Illegal arguments are provided") {
        super(message);
    }
}
