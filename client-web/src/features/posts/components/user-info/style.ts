import styled, { css } from "styled-components";
import { Link } from "@eggziom/geek-regime-js-ui-kit/components/link";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";

const rowCss = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const AuthorInfoStyled = styled.section(() => rowCss);

export const LinkStyled = styled(Link)`
    ${Typography} {
        ${rowCss};
    }
`;
