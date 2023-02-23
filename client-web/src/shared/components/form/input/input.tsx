import React, { useRef, type HTMLProps, type FC } from "react";

import {
    HintStyled,
    HintWrapStyled,
    InputStyled,
    InputWrapStyled,
    LabelStyled,
} from "@/shared/components/form/input/style";

export type InputProps = Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> & {
    hint?: string;
    label?: string;
    name: string;
};

export const Input: FC<InputProps> = ({
    hint,
    label,
    name,
    onChange,
    value,
    ...rest
}) => {
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

            <HintWrapStyled isVisible={Boolean(hint)} ref={hintElementRef}>
                <HintStyled color="orange" fontSize="smaller">
                    {hint}
                </HintStyled>
            </HintWrapStyled>
        </InputWrapStyled>
    );
};
