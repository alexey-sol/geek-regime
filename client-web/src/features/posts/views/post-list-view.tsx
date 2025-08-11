import React, { memo } from "react";

import { PostsPage } from "../components/posts-page";

import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";

const PATH_PREFIX = createAbsolutePostsPath();

export default memo(() => <PostsPage pathPrefix={PATH_PREFIX} />);
