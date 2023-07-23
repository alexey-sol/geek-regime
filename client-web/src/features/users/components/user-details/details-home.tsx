import React, { type FC, useMemo } from "react";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { useGetAllPostsQuery } from "@/features/posts/services/api";
import { GetAllPostsArg } from "@/features/posts/services/api/types";
import { useAppSelector } from "@/app/store/hooks";
import { selectPagingOptions } from "@/features/posts/slice/selectors";

export type DetailsHomeProps = {
    userId: HasId["id"];
};

export const DetailsHome: FC<DetailsHomeProps> = ({ userId }) => {
    const pagingOptions = useAppSelector(selectPagingOptions);
    const { page, size } = pagingOptions;

    const getAllPostsArg: GetAllPostsArg = useMemo(() => ({
        filter: {
            authorId: userId,
        },
        paging: { page, size },
    }), [page, size, userId]); // TODO

    // TODO fetch user's posts
    const { data } = useGetAllPostsQuery(getAllPostsArg);

    return (
        <>
            {data?.items.map((item) => (
                <section key={item.id}>
                    <section>
                        {item.title}
                    </section>
                    <section>
                        {item.excerpt}
                    </section>
                </section>
            ))}
        </>
    );
};
