import { type CreatePostOnSaveArg } from "@/features/posts/utils/hooks/types";
import { type Space } from "@/features/spaces/models/entities";

export type SavePostValues = Omit<CreatePostOnSaveArg, "spaces"> & {
    spaces: Partial<Space>[];
};
