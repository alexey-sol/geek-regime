import type { UserPostDetails, UserPostPreview } from "@/features/posts/models/entities";
import type {
    CreatePostArg,
    GetAllPostsArg,
    UpdatePostByIdArg,
} from "@/features/posts/services/api/types";
import type { PagingOptions } from "@/shared/types";

export type CreatePostOnSaveArg = Pick<CreatePostArg, "title" | "body">;

export type UpdatePostOnSaveArg = Omit<UpdatePostByIdArg, "id">;

export type ActivePostPending = "get" | "create" | "update" | "remove" | "vote";

export type UseActivePostResult = {
    pending?: ActivePostPending;
    post?: UserPostDetails;
    savePost: {
        (arg: CreatePostOnSaveArg): void;
        (arg: UpdatePostOnSaveArg): void;
    };
    voteForPost: (value: number) => void;
};

export type UsePostsPageArg = Pick<GetAllPostsArg, "filter">;

export type UsePostsPageResult = {
    isPending: boolean;
    pagingOptions: PagingOptions;
    posts: UserPostPreview[];
};
