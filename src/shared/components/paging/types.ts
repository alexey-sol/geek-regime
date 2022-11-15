export type UsePagingDataArgs = {
    page: number;
    pageNeighbours: number;
    pathPrefix: string;
    qs: string;
    setPage: (page: number) => void;
    size: number;
    totalItems: number;
};
