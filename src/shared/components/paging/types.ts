import { PagingOptions } from "@/shared/types/models";

export type UsePagingDataArgs = PagingOptions & {
    pageNeighbours: number;
    pathPrefix: string;
    qs: string;
};
