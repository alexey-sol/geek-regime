export const omitUndefined = <T extends {}>(object: T): T => Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
) as T;
