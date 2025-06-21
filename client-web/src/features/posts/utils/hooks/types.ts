import { type PostDetails, type PostPreview, type ProfilePostComment } from "@/features/posts/models/entities";
import { type PagingOptions } from "@/shared/types";
import {
    type CreatePostArg,
    type GetAllPostsArg,
    type GetAllPostsByAuthorArg,
    type GetAllPostsBySpaceArg,
    type UpdatePostByIdArg,
} from "@/features/posts/services/posts-api/types";
import { type UsePageResult } from "@/shared/utils/hooks/use-page";
import { type ApiError } from "@/shared/models/dtos";
import { type GetPostCommentsByAuthorArg } from "@/features/posts/services/post-comments-api/types";
import { type Space } from "@/features/spaces/models/entities";

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

type UseItemPageResult<T = unknown> = {
    isPending: boolean;
    items: T[];
};

export type UsePostsPageResult = UseItemPageResult<PostPreview> & {
    pagingOptions: PagingOptions;
};

export type UseGetAllPostsArg = Pick<UsePageResult, "setTotalElements"> & {
    arg: GetAllPostsArg;
};

export type UseGetAllPostsResult = UseItemPageResult<PostPreview>;

export type UsePostsByAuthorArg = Pick<UsePageResult, "setTotalElements"> & {
    arg?: GetAllPostsByAuthorArg;
};

export type UsePostsByAuthorResult = UseItemPageResult<PostPreview>;

export type UsePostCommentsByAuthorArg = Pick<UsePageResult, "setTotalElements"> & {
    arg?: GetPostCommentsByAuthorArg;
};

export type UsePostCommentsByAuthorResult = UseItemPageResult<ProfilePostComment>;

export type UsePostCommentsPageResult = UseItemPageResult<ProfilePostComment> & {
    pagingOptions: PagingOptions;
};

export type UsePostsBySpaceArg = Pick<UsePageResult, "setTotalElements"> & {
    arg?: GetAllPostsBySpaceArg;
};

export type UsePostsBySpaceResult = UseItemPageResult<PostPreview>;

export type UsePostsBySpacePageResult = UsePostsPageResult & {
    space?: Space;
};

export type UseSpaceResult = Pick<UseItemPageResult, "isPending"> & {
    space?: Space;
};
