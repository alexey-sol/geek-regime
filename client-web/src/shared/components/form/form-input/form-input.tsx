import React, { type FC, type HTMLProps } from "react";
import { useField } from "formik";

import { Input, type InputProps } from "../input";

export type FormInputProps = Omit<HTMLProps<HTMLInputElement>, "ref"> & Pick<InputProps, "name">;

export const FormInput: FC<FormInputProps> = (props) => {
    const [field, meta] = useField(props);

    const errorMessage = (meta.error && meta.touched)
        ? meta.error
        : "";

    return (
        <Input
            {...field}
            {...props}
            errorMessage={errorMessage}
        />
    );
};
