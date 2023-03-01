import styled from "styled-components";

import { BasePopup } from "@/shared/components/base-popup";

export const TooltipWrapStyled = styled.section`
    position: relative;
`;

export const BasePopupStyled = styled(BasePopup)`
    z-index: ${({ theme }) => theme.zIndex.tooltip};
`;
