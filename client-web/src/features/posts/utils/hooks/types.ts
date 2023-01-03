import type { Post } from "@/features/posts/models/entities";
import type { CreatePostArg, UpdatePostByIdArg } from "@/features/posts/services/api/types";

export type CreatePostOnSaveArg = Pick<CreatePostArg, "title" | "body">;

export type UpdatePostOnSaveArg = Omit<UpdatePostByIdArg, "id">;

export type UseActivePostResult = {
    isPending: boolean;
    post?: Post;
    savePost: {
        (arg: CreatePostOnSaveArg): void;
        (arg: UpdatePostOnSaveArg): void;
    };
};
