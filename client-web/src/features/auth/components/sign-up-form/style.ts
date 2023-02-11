import styled from "styled-components";
import { Form } from "formik";

import { Button } from "@/shared/components/button";

export const SignUpFormStyled = styled.section`
    width: 100%;
`;

export const FormStyled = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

export const ButtonStyled = styled(Button)`
    margin-top: 1rem;
`;
