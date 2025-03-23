import { type HasId } from "@eggziom/geek-regime-js-commons";

export const omitUndefined = <T extends {}>(object: T): T => Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
) as T;

const STUB_ID = 0;

export const createStubItem = (): HasId => ({
    id: STUB_ID,
});

export const isStubItem = (item: HasId): item is HasId => item.id === STUB_ID;

export const getStubItems = (size: number): HasId[] => Array(size).fill(createStubItem());
