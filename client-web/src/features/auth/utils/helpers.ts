import { createAbsolutePath } from "@/shared/utils/helpers/url";
import { paths } from "@/shared/const";

export const createConfirmationEmailPath = (email: string): string =>
    `${createAbsolutePath(paths.CONFIRMATION, paths.EMAIL)}`
        + `?${new URLSearchParams({ email })}`;
