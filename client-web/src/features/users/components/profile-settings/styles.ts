import styled from "styled-components";
import { Form } from "formik";

import { Editor } from "@/shared/components/editor";
import { mixins } from "@/app/style/mixins";

export const ProfileSettingsStyled = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
`;

export const UploadFileInputStyled = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
`;

export const UploadFileInputLabelStyled = styled.label`
    display: flex;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;
    transition: border-color ${({ theme }) => theme.durations.fast};

    &:hover {
        border-color: ${({ theme }) => theme.colors.secondary};
    }

    &:hover:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${({ theme }) => theme.colors.secondary};
        opacity: 0.2;
    }
`;

export const FitContentWrapStyled = styled.section`
    width: fit-content;
`;

export const ControlsWrapStyled = styled.section`
    display: flex;
    gap: 1rem;
`;

export const AboutEditorStyled = styled(Editor)`
    width: 40rem;
    min-height: 15rem;
    ${mixins.getEditorBorder()};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: auto;
    }
`;

export const GridStyled = styled.section`
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
    gap: 1.5rem;
`;

export const FormStyled = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`;

export const SectionStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const ColumnStyled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
