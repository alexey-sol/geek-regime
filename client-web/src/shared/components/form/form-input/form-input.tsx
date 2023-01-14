import React, { type HTMLProps } from "react";
import { useField } from "formik";

import { Input, type InputProps } from "../input";

export type FormInputProps = HTMLProps<HTMLInputElement> & Pick<InputProps, "name">;

export const FormInput = (props: FormInputProps) => {
    const [field, meta] = useField(props);

    const errorText = (meta.error && meta.touched)
        ? meta.error
        : "";

    return (
        <Input
            {...field}
            {...props}
            hint={errorText}
        />
    );
};
