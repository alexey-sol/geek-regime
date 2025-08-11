import React, { memo } from "react";

import { SpacesPage } from "../components/spaces-page";

import { createAbsoluteSpacesPath } from "@/features/spaces/utils/helpers";

const PATH_PREFIX = createAbsoluteSpacesPath();

export default memo(() => <SpacesPage pathPrefix={PATH_PREFIX} />);
