import styled, { css } from "styled-components";
import { Link } from "@eggziom/geek-regime-js-ui-kit";

const rowCss = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const AuthorInfoStyled = styled.section(() => rowCss);

export const LinkStyled = styled(Link)(() => rowCss);
