import React, { memo } from "react";

import { UsersPage } from "@/features/users/components/users-page";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";

const PATH_PREFIX = createAbsoluteUsersPath();

export default memo(() => <UsersPage pathPrefix={PATH_PREFIX} />);
