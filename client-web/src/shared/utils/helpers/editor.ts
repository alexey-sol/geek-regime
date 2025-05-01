import type Quill from "quill";

export const setHtmlValue = (editor: Quill, value = ""): void => {
    const delta = editor.clipboard.convert({ html: value });
    editor.setContents(delta);
};
