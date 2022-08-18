import { splitByCapitalizedWords } from "@/shared/utils/helpers/split-by-capitalized-words";
import { ApiResource, ApiResourceExceptionCode } from "@/shared/types/api";

export const formatErrorName = (name: string) => {
    const WORD_TO_EXCLUDE = "exception";
    const SEPARATOR = " ";

    let splitName = splitByCapitalizedWords(name, SEPARATOR);
    const lastIndex = splitName.length - 1;
    const shouldExcludeLastWord = splitName[lastIndex].toLowerCase() === WORD_TO_EXCLUDE;

    if (shouldExcludeLastWord) {
        splitName = splitName.slice(0, lastIndex);
    }

    return splitName.join(SEPARATOR);
};

export const getMessage = (
    resource: ApiResource,
    code: ApiResourceExceptionCode,
    keyValuePairCausedException?: [string, string],
) => {
    let message = `${resource}/${code}`;

    if (keyValuePairCausedException) {
        const [key, value] = keyValuePairCausedException;
        message += `/${key}=${value}`;
    }

    return message;
};
