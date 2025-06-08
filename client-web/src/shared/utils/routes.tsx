import React, { type FC, type PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { paths } from "@/shared/const";

type AuthRouteProps = PropsWithChildren<{
    redirectPath?: string;
}>;

export const AuthRoute: FC<AuthRouteProps> = ({
    children,
    redirectPath = paths.INDEX,
}) => {
    const { profile } = useAuthContext();

    if (!profile) {
        return <Navigate to={redirectPath} replace />;
    }

    return <>{children}</> ?? <Outlet />; // eslint-disable-line react/jsx-no-useless-fragment
};

export const DefaultSearchRoute: FC = () => <Navigate to={`/${paths.SEARCH}/${paths.POSTS}`} />;
