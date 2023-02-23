import { dom } from "@/shared/const";

export const getRootElement = (): HTMLElement =>
    document.getElementById(dom.ROOT_ELEMENT_ID) ?? document.body;
