export type Page<Content = unknown> = {
    items: Content;
    options: {
        size: number;
        totalItems: number;
    };
};

export type PagingOptions = Page["options"] & {
    page: number;
};
