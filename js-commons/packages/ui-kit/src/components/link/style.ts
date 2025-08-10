import styled from "styled-components";
import { Link } from "react-router-dom";

import { baseMixins } from "@/style/mixins";
import { type LinkDecorationProps } from "@/style/mixins/link-decoration";

export const LinkStyled = styled(Link)<LinkDecorationProps>`
    ${(props) => baseMixins.getLinkDecoration(props)};
`;
