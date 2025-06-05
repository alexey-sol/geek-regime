import React, { type FC, PropsWithChildren } from "react";

import { Space } from "@/features/spaces/models/entities";
import { Tag, type TagProps } from "@/shared/components/tag";

type SpaceTagProps = PropsWithChildren<Partial<Pick<Space, "isOfficial">>>
    & Pick<TagProps, "onClose" | "className">;

export const SpaceTag: FC<SpaceTagProps> = ({ children, isOfficial = false, ...rest }) => (
    <Tag color={isOfficial ? "orangeLighten" : "purpleLightest"} {...rest}>
        {children}
    </Tag>
);
