import { type HasId } from "@eggziom/geek-regime-js-commons";

import { type HasPagingQueryParams } from "@/shared/types";

export type GetAllPostCommentsArg = HasPagingQueryParams & {
    postId: HasId["id"];
};
