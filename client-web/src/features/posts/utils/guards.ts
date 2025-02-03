import { type PostPagePeriod } from "@/features/posts/models/dtos";
import { type PostSortValue } from "@/features/posts/types";

const PERIOD_VALUES: PostPagePeriod[] = ["DAY", "WEEK", "MONTH", "YEAR", "OVERALL"];

export const isPeriodValue = (value: unknown): value is PostPagePeriod => typeof value === "string"
    && PERIOD_VALUES.includes(value as PostPagePeriod);

const SORT_VALUES: PostSortValue[] = ["LATEST", "OLDEST"];

export const isSortValue = (value: unknown): value is PostSortValue => typeof value === "string"
    && SORT_VALUES.includes(value as PostSortValue);
