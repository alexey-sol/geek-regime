import React, { useRef, forwardRef, type HTMLProps } from "react";

import {
    FieldErrorMessageStyled,
    HintWrapStyled,
    InputStyled,
    InputWrapStyled,
    LabelStyled,
} from "@/shared/components/form/input/style";

const DEFAULT_TYPE = "text";

export type InputProps = Omit<HTMLProps<HTMLInputElement>, "as" | "ref"> & {
    errorMessage?: string;
    label?: string;
    name: string;
    wrapClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    errorMessage,
    label,
    name,
    onChange,
    value,
    type = DEFAULT_TYPE,
    ...rest
}, ref) => {
    const errorMessageRef = useRef(null);

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

            <HintWrapStyled isVisible={Boolean(errorMessage)} ref={errorMessageRef}>
                <FieldErrorMessageStyled>{errorMessage}</FieldErrorMessageStyled>
            </HintWrapStyled>
        </InputWrapStyled>
    );
});
