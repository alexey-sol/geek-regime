export class InvalidConfigException extends Error {
    constructor(message = "Given config is invalid") {
        super(message);
    }
}
