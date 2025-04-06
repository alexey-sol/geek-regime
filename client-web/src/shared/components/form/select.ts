import styled from "styled-components";

export const Select = styled.select`
    box-sizing: border-box;
    padding: 1rem 3rem 1rem 0.5rem;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    appearance: none;
    background-repeat: no-repeat;
    background-image:
        linear-gradient(45deg, transparent 50%,
        ${({ theme }) => theme.colors.primary} 50%),
        linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 50%, transparent 50%);
    background-position: right 1.5rem top 1.5rem, right 1rem top 1.5rem;
    background-size: 0.5rem 0.5rem, 0.5rem 0.5rem;
    outline: none;
`;
