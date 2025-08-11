import styled from "styled-components";
import { Button, LinkButton } from "@eggziom/geek-regime-js-ui-kit/components/button";

export const SignInFormStyled = styled.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
`;

export const LinkButtonStyled = styled(LinkButton)`
    display: inline;
`;

export const ButtonStyled = styled(Button)`
    margin-top: 1rem;
`;
