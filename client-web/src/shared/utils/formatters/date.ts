import { getLanguage } from "@/shared/utils/language";

const defaultOptions: Intl.DateTimeFormatOptions = {
    dateStyle: "long",
};

export const formatTimestamp = (
    timestamp: string,
    language = getLanguage(),
    options = defaultOptions,
): string => new Intl.DateTimeFormat(language, options).format(new Date(timestamp));
