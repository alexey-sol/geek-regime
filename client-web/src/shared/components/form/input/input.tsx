import React, { type HTMLProps, useRef } from "react";

import {
    HintStyled,
    InputStyled,
    InputWrapStyled,
    LabelStyled,
} from "@/shared/components/form/input/style";

export type InputProps = Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> & {
    hint?: string;
    label?: string;
    name: string;
};

export const Input = ({
    hint,
    label,
    name,
    onChange,
    value,
    ...rest
}: InputProps) => {
    const hintElementRef = useRef(null);

    return (
        <InputWrapStyled>
            <InputStyled
                {...rest}
                name={name}
                onChange={onChange}
                value={value}
            />

            {label && (
                <LabelStyled hasValue={Boolean(value)}>
                    {label}
                </LabelStyled>
            )}

            {hint && (
                <HintStyled ref={hintElementRef}>
                    {hint}
                </HintStyled>
            )}
        </InputWrapStyled>
    );
};
