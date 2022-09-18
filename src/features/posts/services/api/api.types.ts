import { PagingOptions } from "@/shared/types/models";

export type GetAllPostsArg = Pick<PagingOptions, "page" | "size">;
