import { type HasId } from "@eggziom/geek-regime-js-commons";

export const omitUndefined = <T extends {}>(object: T): T => Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
) as T;

const INITIAL_STUB_ID = -1;

export const createStubItem = (stubId = INITIAL_STUB_ID): HasId => ({
    id: stubId,
});

export const isStubItem = (item: HasId): item is HasId => item.id <= INITIAL_STUB_ID;

export const getStubItems = (size: number): HasId[] =>
    Array.from(Array(size)).map((_, index) => createStubItem(INITIAL_STUB_ID - index));
