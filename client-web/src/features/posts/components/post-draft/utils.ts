import { type KeyboardEventHandler } from "react";

import { type SaveSpaceRequest } from "@/features/spaces/models/dtos";

export const omitBlankSpace = (spaces: SaveSpaceRequest[] = []): SaveSpaceRequest[] => spaces?.slice(1);

export const handleTitleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
};
