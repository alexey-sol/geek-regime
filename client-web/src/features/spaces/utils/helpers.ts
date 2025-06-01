import { Color } from "@eggziom/geek-regime-js-ui-kit";

import { paths } from "@/shared/const";
import { createAbsolutePath } from "@/shared/utils/helpers/url";

export const createAbsoluteSpacesPath = (...segments: string[]): string =>
    createAbsolutePath(paths.SPACES, ...segments);

export const createAbsoluteSpacePostsPath = (spaceSlug: string): string =>
    createAbsoluteSpacesPath(spaceSlug ?? "", paths.POSTS);

export const getSpaceTagColor = (isOfficial = false): Color => (isOfficial
    ? "orangeLighten"
    : "purpleLightest");
