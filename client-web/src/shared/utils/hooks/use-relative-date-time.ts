import differenceInDays from "date-fns/differenceInDays";
import differenceInMonths from "date-fns/differenceInMonths";
import differenceInYears from "date-fns/differenceInYears";

import { useLanguage } from "@/shared/utils/language";

const DEFAULT_OPTIONS: Intl.RelativeTimeFormatOptions = {
    numeric: "auto",
};

type UseRelativeTimeArg = {
    timestamp?: string;
    options?: Intl.RelativeTimeFormatOptions;
};

type UseRelativeTimeResult = {
    formattedTimestamp: string;
};

export const useRelativeDateTime = ({
    options,
    timestamp,
}: UseRelativeTimeArg): UseRelativeTimeResult => {
    const { language } = useLanguage();

    const now = new Date();
    const date = timestamp ? new Date(timestamp) : now;

    const daysAgo = differenceInDays(date, now);
    const monthsAgo = differenceInMonths(date, now);
    const yearsAgo = differenceInYears(date, now);

    let resultTime: number;
    let unit: Intl.RelativeTimeFormatUnit;

    if (monthsAgo > -1) {
        resultTime = daysAgo;
        unit = "days";
    } else if (yearsAgo > -1) {
        resultTime = monthsAgo;
        unit = "months";
    } else {
        resultTime = yearsAgo;
        unit = "years";
    }

    const relativeTimeFormat = new Intl.RelativeTimeFormat(language, {
        ...DEFAULT_OPTIONS,
        ...options,
    });

    return {
        formattedTimestamp: relativeTimeFormat.format(resultTime, unit),
    };
};
