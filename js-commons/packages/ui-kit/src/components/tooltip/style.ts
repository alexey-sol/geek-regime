import styled from "styled-components";

import { BasePopup } from "../base-popup/base-popup";

export const TooltipWrapStyled = styled.span`
    position: relative;
`;

export const BasePopupStyled = styled(BasePopup)`
    z-index: ${({ theme }) => theme.zIndex.tooltip};
`;
