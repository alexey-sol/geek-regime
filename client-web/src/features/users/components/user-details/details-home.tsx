import React, { type FC } from "react";
import { type HasId } from "js-commons";

import { useGetAllPostsQuery } from "@/features/posts/services/api";

export type DetailsHomeProps = {
    userId: HasId["id"];
};

export const DetailsHome: FC<DetailsHomeProps> = ({ userId }) => {
    // TODO fetch user's posts
    const { data } = useGetAllPostsQuery();

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
