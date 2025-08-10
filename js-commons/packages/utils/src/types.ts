export type HasHttpStatus = {
    status: number;
};

export type HasId<T extends number | string = number> = {
    id: T;
};
