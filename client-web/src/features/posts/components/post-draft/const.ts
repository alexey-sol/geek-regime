import { type Space } from "@/features/spaces/models/entities";

export const DEFAULT_SPACES: Space[] = [];

export const BLANK_SPACE_INDEX = 0;

export const BLANK_SPACE: Partial<Space> = {
    title: "",
};

export const MAX_SPACE_COUNT = 10;
