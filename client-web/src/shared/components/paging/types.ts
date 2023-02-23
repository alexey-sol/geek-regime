import type { PagingOptions } from "@/shared/models/entities";

export type UsePagingDataArg = PagingOptions & {
    pageNeighbours: number;
    pathPrefix: string;
    qs: string;
};

export type PagingData = {
    goToPage: (selectedPage: number) => void;
    hasLeftSpill: boolean;
    hasRightSpill: boolean;
    isMinifiedView: boolean;
    lastPage: number;
    pagesRange: number[];
};
