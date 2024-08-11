import React, { useRef, type HTMLProps, type FC } from "react";

import {
    HintStyled,
    HintWrapStyled,
    InputStyled,
    InputWrapStyled,
    LabelStyled,
} from "@/shared/components/form/input/style";

const DEFAULT_TYPE = "text";

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
    type = DEFAULT_TYPE,
    ...rest
}) => {
    const hintRef = useRef(null);

    return (
        <InputWrapStyled>
            <InputStyled
                {...rest}
                name={name}
                onChange={onChange}
                type={type}
                value={value}
            />

            {label && (
                <LabelStyled hasValue={Boolean(value)}>
                    {label}
                </LabelStyled>
            )}

            <HintWrapStyled isVisible={Boolean(hint)} ref={hintRef}>
                <HintStyled color="orange" fontSize="xs">
                    {hint}
                </HintStyled>
            </HintWrapStyled>
        </InputWrapStyled>
    );
};
