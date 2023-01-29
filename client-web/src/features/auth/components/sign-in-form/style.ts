import styled from "styled-components";

import { Button } from "@/shared/components/button";

export const SignInFormStyled = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 2rem;
`;

export const TransparentButtonStyled = styled(Button)`
    display: inline;
`;

export const ButtonStyled = styled(Button)`
    margin-top: 2rem;
`;
