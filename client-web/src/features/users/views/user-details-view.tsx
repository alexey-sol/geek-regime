import React, { type FC, memo } from "react";

import { UserDetails } from "@/features/users/components/user-details";
import { useActiveUser } from "@/features/users/utils/hooks/use-active-user";

export const UserDetailsView: FC = () => {
    const { pending, user } = useActiveUser();

    if (!user) {
        return null; // TODO loading?
    }

    return (
        <section>
            {Boolean(pending) && "loading..."}
            <UserDetails user={user} />
        </section>
    );
};

export default memo(() => <UserDetailsView />);
