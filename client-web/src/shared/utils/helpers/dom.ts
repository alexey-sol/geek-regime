import { dom } from "@/shared/const";

export const getRootElement = () => document.getElementById(dom.ROOT_ELEMENT_ID) ?? document.body;
