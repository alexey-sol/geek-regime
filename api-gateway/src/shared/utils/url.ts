const PATH_DELIMITER = "/";

/**
 * Parses the path from the end, segment by segment, and returns the 1st found known resource
 * in it.
 * @param {string} apiPath - The path to parse.
 * @param {Array.<string>} knownResources - The list of resources to be expected to be found in
 * the path.
 * @returns {string} - The 1st found known resource found in the path. Assuming that the path
 * looks like "/api/v1/users/5/posts/my-post" and the known resources are "posts" and "users",
 * the result is going to be "posts". If a known resource isn't found, the result will be an
 * empty string.
 */
export const getResource = (
    apiPath: string,
    knownResources: string[],
): string => {
    const reversedSplitPath = apiPath.split(PATH_DELIMITER).reverse();

    for (const segment of reversedSplitPath) { // eslint-disable-line no-restricted-syntax
        if (knownResources.includes(segment)) {
            return segment;
        }
    }

    return "";
};
