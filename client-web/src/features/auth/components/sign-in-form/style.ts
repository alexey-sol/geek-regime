import styled from "styled-components";

import { Button } from "@/shared/components/button";

export const SignInFormStyled = styled.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
`;

export const TransparentButtonStyled = styled(Button)`
    display: inline;
`;

export const ButtonStyled = styled(Button)`
    margin-top: 1rem;
`;
