import { type PostDetails, type PostPreview } from "@/features/posts/models/entities";
import { type PagingOptions } from "@/shared/types";
import {
    type CreatePostArg,
    type GetAllPostsArg,
    type GetAllPostsByAuthorArg,
    type UpdatePostByIdArg,
} from "@/features/posts/services/posts-api/types";
import type { UsePageResult } from "@/shared/utils/hooks/use-page";

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

export type UsePostsPageResult = {
    isPending: boolean;
    pagingOptions: PagingOptions;
    posts: PostPreview[];
};

export type UseGetAllPostsArg = Pick<UsePageResult, "setTotalElements"> & {
    arg: GetAllPostsArg;
};

export type UseGetAllPostsResult = Pick<UsePostsPageResult, "isPending" | "posts">;

export type UseGetAllPostsByAuthorArg = Pick<UsePageResult, "setTotalElements"> & {
    arg?: GetAllPostsByAuthorArg;
};

export type UseGetAllPostsByAuthorResult = Pick<UsePostsPageResult, "isPending" | "posts">;
