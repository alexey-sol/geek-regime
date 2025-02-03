import { type PostDetails, type PostPreview } from "@/features/posts/models/entities";
import { type PagingOptions } from "@/shared/types";
import {
    type CreatePostArg,
    type GetAllPostsArg,
    type UpdatePostByIdArg,
} from "@/features/posts/services/posts-api/types";

export type CreatePostOnSaveArg = Pick<CreatePostArg, "title" | "body">;

export type UpdatePostOnSaveArg = Omit<UpdatePostByIdArg, "id">;

export type ActivePostPending = "get" | "create" | "update" | "remove" | "vote";

export type UseActivePostResult = {
    pending?: ActivePostPending;
    post?: PostDetails;
    savePost: {
        (arg: CreatePostOnSaveArg): void;
        (arg: UpdatePostOnSaveArg): void;
    };
    voteOnPost: (value: number) => void;
};

export type UsePostsPageArg = Pick<GetAllPostsArg, "filter">;

export type UsePostsPageResult = {
    isPending: boolean;
    pagingOptions: PagingOptions;
    posts: PostPreview[];
};
