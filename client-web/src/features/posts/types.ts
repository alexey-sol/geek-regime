import { type HasId } from "@eggziom/geek-regime-js-commons";

import type { PostPagePeriod } from "@/features/posts/models/dtos";

export type HasAuthorId = {
    authorId: HasId["id"];
};

export type PostSortValue = "LATEST" | "OLDEST";

export type PostsPageSettings = {
    period: PostPagePeriod;
    sort: PostSortValue;
};

export type PeriodAndSortQueryParams = {
    period?: PostPagePeriod;
    sort?: string;
};
