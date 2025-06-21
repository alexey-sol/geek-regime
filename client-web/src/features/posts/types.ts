import { type HasId } from "@eggziom/geek-regime-js-commons";

export type HasAuthorId = {
    authorId: HasId["id"];
};

export type HasSpaceId = {
    spaceId: HasId["id"];
};

export type PostCommentPending = "getReplies" | "getRoots" | "create" | "update" | "remove";
