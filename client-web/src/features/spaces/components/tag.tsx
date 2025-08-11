import { type Color } from "@eggziom/geek-regime-js-ui-kit/types";
import styled, { css } from "styled-components";

import { type Space } from "@/features/spaces/models/entities";
import { Tag } from "@/shared/components/tag";
import { mixins } from "@/app/style/mixins";

export const SpaceTag = styled(Tag)<Partial<Pick<Space, "isActive" | "isOfficial">>>(
    ({ theme, isActive, isOfficial }) => {
        const bgColor: Color = isOfficial ? "orangeLighten" : "purpleLightest";
        const borderColor: Color = isOfficial ? "orange" : "purpleLighten";

        return css`
            border: 1px solid transparent;
            background-color: ${theme.colors[bgColor]};
            user-select: none;

            ${isActive && css`
                border-color: ${theme.colors[borderColor]};
                background: ${mixins.getColorMix(bgColor, 60)};
            `};
        `;
    },
);
