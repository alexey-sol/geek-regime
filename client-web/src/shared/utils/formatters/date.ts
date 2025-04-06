import { getLanguage } from "@/shared/utils/language";

const defaultOptions: Intl.DateTimeFormatOptions = {
    dateStyle: "long",
};

export const formatTimestamp = (
    timestamp: string,
    options = {},
    language = getLanguage(),
): string => new Intl.DateTimeFormat(language, { ...defaultOptions, ...options })
    .format(new Date(timestamp));

const DATE_TIME_DELIMITER = "T";

export const getDateWithoutTime = (dateString: string): string =>
    dateString.split(DATE_TIME_DELIMITER)[0] ?? "";
