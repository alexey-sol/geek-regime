import { type PagingOptions } from "@/shared/types";
import { type GetAllSpacesArg } from "@/features/spaces/services/api/types";
import { type UsePageResult } from "@/shared/utils/hooks/use-page";
import { type Space } from "@/features/spaces/models/entities";
import { type GetAllPostsBySpaceArg } from "@/features/posts/services/posts-api/types";
import { type UsePostsPageResult } from "@/features/posts/utils/hooks/types";

export type UseSpacesPageResult = {
    isPending: boolean;
    pagingOptions: PagingOptions;
    spaces: Space[];
};

export type UseGetAllSpacesArg = Pick<UsePageResult, "setTotalElements"> & {
    arg: GetAllSpacesArg;
};

export type UseGetAllSpacesResult = Pick<UseSpacesPageResult, "isPending" | "spaces">;

export type UseSpaceResult = {
    isFetchingSpace: boolean;
    space?: Space;
};

export type UsePostsBySpaceArg = Pick<UsePageResult, "setTotalElements"> & {
    arg?: GetAllPostsBySpaceArg;
};

export type UsePostsBySpaceResult = Pick<UsePostsPageResult, "posts"> & {
    isFetchingPosts: boolean;
};

export type UsePostsBySpacePageResult = UsePostsPageResult & {
    space?: Space;
};
