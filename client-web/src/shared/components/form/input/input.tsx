import React, { useRef, type HTMLProps, forwardRef } from "react";

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
    wrapClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    hint,
    label,
    name,
    onChange,
    value,
    type = DEFAULT_TYPE,
    ...rest
}, ref) => {
    const hintRef = useRef(null);

    return (
        <InputWrapStyled className={className}>
            <InputStyled
                {...rest}
                hasLabel={Boolean(label)}
                name={name}
                onChange={onChange}
                ref={ref}
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
});
