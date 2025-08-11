import { type HasId } from "@eggziom/geek-regime-js-utils";

export const omit = <T extends object>(
    object: T,
    shouldOmit: (key: keyof T, value: T[keyof T]) => boolean,
): T => Object.fromEntries(
    Object.entries(object)
        .filter(([key, value]) => !shouldOmit(key as keyof T, value)),
) as T;

export const omitFalsy = <T extends object>(object: T): T => omit(
    object,
    (_, value) => !value,
);

export const omitUndefined = <T extends object>(object: T): T => omit(
    object,
    (_, value: unknown) => value === undefined,
);

const INITIAL_STUB_ID = -1;

export const createStubItem = (stubId = INITIAL_STUB_ID): HasId => ({
    id: stubId,
});

export const isStubItem = (item: HasId): item is HasId => item.id <= INITIAL_STUB_ID;

export const getStubItems = (size: number): HasId[] =>
    Array.from(Array(size)).map((_, index) => createStubItem(INITIAL_STUB_ID - index));
