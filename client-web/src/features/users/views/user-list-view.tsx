import React, { memo } from "react";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { UsersPage } from "@/features/users/components/users-page";

const PATH_PREFIX = createAbsolutePostsPath();

export default memo(() => <UsersPage pathPrefix={PATH_PREFIX} />);
