import format from "date-fns/format";
import { defaults } from "@/shared/const";

export const formatTimestamp = (
    timestamp: string,
    pattern = defaults.DATE_FORMAT_PATTERN,
) => format(new Date(timestamp), pattern);
