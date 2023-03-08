export type HasId<Id extends number | string = number> = {
    id: Id;
};

export type HasHttpStatus = { status: number };
