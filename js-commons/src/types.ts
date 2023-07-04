export type HasHttpStatus = {
    status: number;
};

export type HasId<Id extends number | string = number> = {
    id: Id;
};
