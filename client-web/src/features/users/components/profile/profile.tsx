import React, { type FC, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { paths } from "@/shared/const";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { TabBar } from "@/shared/components/tabs/tab-bar";
import { Tab } from "@/shared/components/tabs/tab";
import { TabContextProvider } from "@/shared/components/tabs/tab-context";
import { TabPanel } from "@/shared/components/tabs/tab-panel";
import { ProfileHome } from "@/features/users/components/profile-home";
import type { User } from "@/features/users/models/entities";
import type { HandleChange } from "@/shared/components/tabs/types";

import { UserPostsPage } from "../user-posts-page";

export const ProfileStyled = styled.section`
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
    height: 100%;
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

export const Profile: FC<UserDetailsProps> = ({ user }) => {
    const navigate = useNavigate();
    const { tab = "" } = useParams();
    const { t } = useTranslation();

    const { profile } = useAuthContext();

    const slug = user?.slug ?? "";
    const isAuthUser = profile?.id === user.id;

    const homePath = createAbsoluteUsersPath(slug);
    const postsPath = createAbsoluteUsersPath(slug, paths.POSTS);
    const commentsPath = createAbsoluteUsersPath(slug, paths.COMMENTS);
    const settingsPath = createAbsoluteUsersPath(slug, paths.SETTINGS);
    const initialTabValue = createAbsoluteUsersPath(slug, tab);

    const handleChange = useCallback<HandleChange>((value) => {
        navigate(value);
    }, [navigate]);

    return (
        <ProfileStyled>
            <TabsWrapStyled>
                <TabContextProvider onChange={handleChange} initialValue={initialTabValue}>
                    <TabBar>
                        <Tab value={homePath} label={t("users.profile.tabs.home")} />
                        <Tab value={postsPath} label={t("users.profile.tabs.posts")} />
                        <Tab value={commentsPath} label={t("users.profile.tabs.comments")} />
                        {isAuthUser && (
                            <Tab value={settingsPath} label={t("users.profile.tabs.settings")} />
                        )}
                    </TabBar>

                    <TabPanel value={homePath}>
                        <ProfileHome user={user} />
                    </TabPanel>

                    <TabPanel value={postsPath}>
                        <UserPostsPage />
                    </TabPanel>

                    <TabPanel value={commentsPath}>
                        Comments
                    </TabPanel>

                    {isAuthUser && ( // TODO must be a protected route
                        <TabPanel value={settingsPath}>
                            Settings
                        </TabPanel>
                    )}
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
        </ProfileStyled>
    );
};
