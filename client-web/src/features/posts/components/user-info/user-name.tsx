import React, { type FC } from "react";
import { Link } from "@eggziom/geek-regime-js-ui-kit";

import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";

import { DefunctAccountTitle } from "./defunct-account-title";
import { type UserInfoProps } from "./types";

export const UserName: FC<Pick<UserInfoProps, "author">> = ({ author }) => (author
    ? (
        <Link
            data-testid="post-overview/author-slug-link"
            to={createAbsoluteUsersPath(author.slug)}
        >
            {author.details.name}
        </Link>
    )
    : (
        <DefunctAccountTitle />
    ));
