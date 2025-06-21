import React, { memo } from "react";
import { useParams } from "react-router";

import { createAbsoluteSpacesPath } from "@/features/spaces/utils/helpers";
import { paths } from "@/shared/const";

import { PostsBySpacePage } from "../components/posts-by-space-page";

export default memo(() => {
    const { slug = "" } = useParams();
    const pathPrefix = createAbsoluteSpacesPath(slug, paths.POSTS);

    return (
        <PostsBySpacePage pathPrefix={pathPrefix} />
    );
});
