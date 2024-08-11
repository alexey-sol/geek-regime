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
