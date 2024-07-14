import type { UserPostDetails } from "@/features/posts/models/entities";
import type { CreatePostArg, UpdatePostByIdArg } from "@/features/posts/services/api/types";

export type CreatePostOnSaveArg = Pick<CreatePostArg, "title" | "body">;

export type UpdatePostOnSaveArg = Omit<UpdatePostByIdArg, "id">;

export type ActivePostPending = "get" | "create" | "update" | "remove";

export type UseActivePostResult = {
    pending?: ActivePostPending;
    post?: UserPostDetails;
    savePost: {
        (arg: CreatePostOnSaveArg): void;
        (arg: UpdatePostOnSaveArg): void;
    };
};
