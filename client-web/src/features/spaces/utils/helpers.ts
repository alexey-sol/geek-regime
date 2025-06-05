import { paths } from "@/shared/const";
import { createAbsolutePath } from "@/shared/utils/helpers/url";

export const createAbsoluteSpacesPath = (...segments: string[]): string =>
    createAbsolutePath(paths.SPACES, ...segments);

export const createAbsoluteSpacePostsPath = (spaceSlug: string): string =>
    createAbsoluteSpacesPath(spaceSlug ?? "", paths.POSTS);
