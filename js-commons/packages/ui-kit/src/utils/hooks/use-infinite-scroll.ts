import { type RefObject, useEffect, useRef } from "react";

const DEFAULT_OBSERVER_OPTIONS: IntersectionObserverInit = {
    rootMargin: "0px",
    threshold: 1,
};

type UseInfiniteScrollArg = {
    hasMore?: boolean;
    onLoadMore: () => void;
    options?: IntersectionObserverInit;
};

type UseInfiniteScrollResult<E> = {
    sentryRef: RefObject<E>;
};

export const useInfiniteScroll = <E extends HTMLElement = HTMLElement>({
    hasMore = false,
    onLoadMore,
    options,
}: UseInfiniteScrollArg): UseInfiniteScrollResult<E> => {
    const sentryRef = useRef<E>(null);

    useEffect(() => {
        const scrollable = sentryRef.current;

        if (!scrollable) {
            return undefined;
        }

        const handleIntersect: IntersectionObserverCallback = ([entry]) => {
            if (entry.isIntersecting && hasMore) {
                onLoadMore();
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            ...DEFAULT_OBSERVER_OPTIONS,
            ...options,
        });

        observer.observe(scrollable);

        return () => {
            observer.unobserve(scrollable);
        };
    }, [hasMore, onLoadMore, options]);

    return { sentryRef };
};
