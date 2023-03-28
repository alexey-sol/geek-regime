import { paths } from "@/shared/const";
import { createAbsolutePath } from "@/shared/utils/helpers/url";

export const createAbsolutePostsPath = (...segments: string[]): string =>
    createAbsolutePath(paths.POSTS, ...segments);
