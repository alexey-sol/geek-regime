import styled, { css } from "styled-components";
import { type HasColor } from "@eggziom/geek-regime-js-ui-kit";

type GetColorMixArg = HasColor & {
    transparency: number;
};

const getColorMix = ({ color, transparency }: GetColorMixArg) => css`
    color-mix(in srgb, ${({ theme }) => theme.colors[color]}, transparent ${transparency}%);
`;

export const SpaceOverviewStyled = styled.section<HasColor>`
    display: flex;
    flex-direction: column;
    flex: 1;
    row-gap: 1rem;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    word-break: break-word;
    transition: background ${({ theme }) => theme.durations.fast} ease;
    background: ${({ color }) => getColorMix({ color, transparency: 85 })};

    &:hover {
        background: ${({ color }) => getColorMix({ color, transparency: 75 })};
    }
`;

export const HeaderStyled = styled.section`
    display: flex;
    justify-content: space-between;
`;

export const NonOfficialIconWrap = styled.section`
    cursor: default;
`;
