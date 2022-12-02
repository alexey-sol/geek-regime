import { PagingOptions } from "@/shared/models/entities";

export type UsePagingDataArgs = PagingOptions & {
    pageNeighbours: number;
    pathPrefix: string;
    qs: string;
};
