import { type PostDetails, type PostPreview } from "@/features/posts/models/entities";
import { type PagingOptions } from "@/shared/types";
import {
    type CreatePostArg,
    type GetAllPostsArg,
    type UpdatePostByIdArg,
} from "@/features/posts/services/posts-api/types";
import { type UsePageResult } from "@/shared/utils/hooks/use-page";
import { type ApiError } from "@/shared/models/dtos";

export type CreatePostOnSaveArg = Pick<CreatePostArg, "spaces" | "title" | "body">;

export type UpdatePostOnSaveArg = Omit<UpdatePostByIdArg, "id">;

export type ActivePostPending = "get" | "create" | "update" | "remove" | "vote";

export type ActivePostErrors = Partial<Record<"get", ApiError>>;

export type UseActivePostResult = {
    errors: ActivePostErrors;
    pending?: ActivePostPending;
    post?: PostDetails;
    savePost: {
        (arg: CreatePostOnSaveArg, onSuccess?: () => void): void;
        (arg: UpdatePostOnSaveArg, onSuccess?: () => void): void;
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
