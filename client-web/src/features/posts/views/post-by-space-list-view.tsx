import React, { memo } from "react";
import { useParams } from "react-router-dom";

import { PostsBySpacePage } from "../components/posts-by-space-page";

import { createAbsoluteSpacesPath } from "@/features/spaces/utils/helpers";
import { paths } from "@/shared/const";

export default memo(() => {
    const { slug = "" } = useParams();
    const pathPrefix = createAbsoluteSpacesPath(slug, paths.POSTS);

    return (
        <PostsBySpacePage pathPrefix={pathPrefix} />
    );
});
