import { paths } from "@/shared/const";
import { createAbsolutePath } from "@/shared/utils/helpers/url";

export const createAbsoluteUsersPath = (...segments: string[]): string =>
    createAbsolutePath(paths.USERS, ...segments);
