import styled from "styled-components";
import { Form } from "formik";

import { Editor } from "@/shared/components/editor";
import { mixins } from "@/app/style/mixins";
import { FieldErrorMessage } from "@/shared/components/typography";

export const PostDraftFormStyled = styled(Form)`
    position: relative;
    display: grid;
    grid-template-rows: auto minmax(60vh, 1fr) auto auto;;
    width: 100%;
    height: 100%;
    row-gap: 2rem;
`;

export const TitleInputStyled = styled.input`
    width: 100%;
    padding: 1rem 1.5rem;
    font-family: ${({ theme }) => theme.fonts.normal};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
    outline: none;
    ${mixins.getEditorBorder()};
`;

export const RelativePositionWrapStyled = styled.section`
    position: relative;
`;

export const DraftEditorStyled = styled(Editor)`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    ${mixins.getEditorBorder()};
`;

export const ControlsWrapStyled = styled.section`
    display: flex;
    gap: 1rem;
`;

export const FieldErrorMessageStyled = styled(FieldErrorMessage)`
    position: absolute;
`;
