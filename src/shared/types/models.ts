type SortDto = {
    empty: false;
    sorted: true;
    unsorted: false;
}

export type PageDto<Content = unknown> = {
    content: Content;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: SortDto;
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
        unpaged: boolean;
    };
    size: number;
    sort: SortDto;
    totalElements: number;
    totalPages: number;
}

export type Page<Content = unknown> = {
    items: Content;
    options: {
        size: number;
        totalPages: number;
        totalSize: number;
    }
};

export type Paging = {
    page: number;
    size: number;
}
