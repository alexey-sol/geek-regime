import React, { memo } from "react";

import { createAbsoluteSpacesPath } from "@/features/spaces/utils/helpers";

import { SpacesPage } from "../components/spaces-page";

const PATH_PREFIX = createAbsoluteSpacesPath();

export default memo(() => <SpacesPage pathPrefix={PATH_PREFIX} />);
