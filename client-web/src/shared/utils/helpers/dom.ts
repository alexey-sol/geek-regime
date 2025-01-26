import { type DOMAttributes } from "react";
import { sanitize } from "dompurify";

import { dom } from "@/shared/const";

export const getRootElement = (): HTMLElement =>
    document.getElementById(dom.ROOT_ELEMENT_ID) ?? document.body;

export const createInnerHtml = (html: string): DOMAttributes<unknown>["dangerouslySetInnerHTML"] => ({
    __html: html,
});

export const purifyHtml = (html: string): string => sanitize(html.trim());
