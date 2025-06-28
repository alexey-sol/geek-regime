import { type KeyboardEventHandler } from "react";

import { type Space } from "@/features/spaces/models/entities";
import { BLANK_SPACE } from "@/features/posts/components/post-draft/const";
import { normalizeString } from "@/shared/utils/helpers/string";

export const handleTitleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
};

const filterDuplicateSpaces = (spaces: Partial<Space>[]): Partial<Space>[] =>
    spaces.filter((a, index, array) =>
        array.findIndex((b) => (normalizeString(a.title) === normalizeString(b.title))) === index);

export const createSpaceValues = (spaces: Partial<Space>[]): Partial<Space>[] =>
    filterDuplicateSpaces([BLANK_SPACE, ...spaces]);

export const omitBlankSpace = (spaces: Partial<Space>[]): Partial<Space>[] =>
    spaces?.slice(1);

export const pickActiveSpaces = (spaces: Partial<Space>[]): Partial<Space>[] =>
    omitBlankSpace(spaces).filter(({ isActive }) => isActive);

export const toActiveSpaceList = (spaces: Space[]): Space[] => spaces.map((space) => ({
    ...space,
    isActive: true,
}));
