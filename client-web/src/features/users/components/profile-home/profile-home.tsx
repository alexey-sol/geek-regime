import React, { FC } from "react";

import {User, UserDetails} from "@/features/users/models/entities";

type ProfileHomeProps = {
    user: User;
};

export const ProfileHome: FC<ProfileHomeProps> = ({ user }) => {
    const {
        about, description, gender, image, name,
    } = user.details;

    return (
        <div>
            {name}
        </div>
    );
};
