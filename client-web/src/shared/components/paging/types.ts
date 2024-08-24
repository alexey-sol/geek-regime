import type { PagingOptions } from "@/shared/types";

export type UsePagingDataArg = PagingOptions & {
    pageNeighbours: number;
    pathPrefix: string;
};

export type PagingData = {
    goToPage: (selectedPage: number) => void;
    hasLeftSpill: boolean;
    hasRightSpill: boolean;
    isMinifiedView: boolean;
    lastPage: number;
    pagesRange: number[];
};
