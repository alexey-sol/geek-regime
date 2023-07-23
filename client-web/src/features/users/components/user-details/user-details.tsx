import React, { type FC, useCallback } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { paths } from "@/shared/const";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { TabBar } from "@/shared/components/tabs/tab-bar";
import { Tab } from "@/shared/components/tabs/tab";
import { TabContextProvider } from "@/shared/components/tabs/tab-context";
import { TabPanel } from "@/shared/components/tabs/tab-panel";
import { DetailsHome } from "@/features/users/components/user-details/details-home";
import type { User } from "@/features/users/models/entities";
import type { HandleChange } from "@/shared/components/tabs/types";

export const UserDetailsStyled = styled.section`
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
`;

export const TabsWrapStyled = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const DetailsStyled = styled.section`
    display: flex;
    flex-direction: column;
`;

export type UserDetailsProps = {
    user: User;
};

export const UserDetails: FC<UserDetailsProps> = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { pending, profile, signOut } = useAuthContext();

    const slug = profile?.slug ?? "";
    const isAuthUser = profile?.id === user.id;

    const homePath = createAbsoluteUsersPath(slug);
    const aboutPath = createAbsoluteUsersPath(slug, paths.ABOUT);
    const settingsPath = createAbsoluteUsersPath(slug, paths.SETTINGS);

    const handleChange = useCallback<HandleChange>((value) => {
        navigate(value);
    }, [navigate]);

    return (
        <UserDetailsStyled>
            <TabsWrapStyled>
                <TabContextProvider onChange={handleChange} initialValue={location.pathname}>
                    <TabBar>
                        <Tab value={homePath} label="Home" />
                        <Tab value={aboutPath} label="About" />
                        {isAuthUser && <Tab value={settingsPath} label="Settings" />}
                    </TabBar>

                    <TabPanel value={homePath}>
                        <DetailsHome userId={user.id} />
                    </TabPanel>

                    <TabPanel value={aboutPath}>
                        About
                    </TabPanel>

                    <TabPanel value={settingsPath}>
                        Sett
                    </TabPanel>
                </TabContextProvider>
            </TabsWrapStyled>

            <DetailsStyled>
                <Typography>
                    {user.details.name}
                </Typography>

                <section>
                    pic and stuff
                </section>
            </DetailsStyled>
        </UserDetailsStyled>
    );
};
