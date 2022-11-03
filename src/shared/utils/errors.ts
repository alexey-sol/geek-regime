export class InvalidConfigError extends Error {
    constructor(message = "Given config is invalid") {
        super(message);
    }
}
