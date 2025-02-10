import React, {
    useCallback, useEffect, useRef, useState, type FC,
} from "react";
import { ValidationError } from "yup";
import type Quill from "quill";

import { CommentBox, CommentBoxProps } from "@/shared/components/comment-box";
import { getPostCommentSchema } from "@/features/posts/utils/validation/schemas";

const INITIAL_ERRORS: string[] = [];

export const PostCommentBox: FC<CommentBoxProps> = ({ onSubmit, ...rest }) => {
    const editorRef = useRef<Quill>(null);
    const bodyText = editorRef.current?.getText().trim() ?? "";

    const [errors, setErrors] = useState<string[]>(INITIAL_ERRORS);
    const schema = getPostCommentSchema();

    useEffect(() => {
        setErrors(INITIAL_ERRORS);
    }, [bodyText]);

    const handleSubmit = useCallback(async () => {
        try {
            await schema.validate({ bodyText });
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                setErrors(error.errors);
                return;
            }
        }

        onSubmit?.();
    }, [bodyText, onSubmit, schema]);

    const rootErrorMessage = errors.length ? errors.join(", ") : undefined;

    return (
        <CommentBox
            {...rest}
            editorRef={editorRef}
            errorMessage={rootErrorMessage}
            onSubmit={handleSubmit}
        />
    );
};
