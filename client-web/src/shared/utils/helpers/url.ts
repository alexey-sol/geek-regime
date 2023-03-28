const PATH_DELIMITER = "/";

export const createAbsolutePath = (...segments: string[]): string =>
    PATH_DELIMITER + segments.join(PATH_DELIMITER);
