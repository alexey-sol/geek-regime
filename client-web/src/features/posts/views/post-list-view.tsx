import React, { memo } from "react";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";

import { PostsPage } from "../components/posts-page";

const PATH_PREFIX = createAbsolutePostsPath();

export default memo(() => <PostsPage pathPrefix={PATH_PREFIX} />);
