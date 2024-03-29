import { Link } from "react-router-dom";
import styled from "styled-components";

import { mixins } from "@/app/style/mixins";

export const BaseLink = styled(Link)`
    ${mixins.getLinkDecoration()};
`;
