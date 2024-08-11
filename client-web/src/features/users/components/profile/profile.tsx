import React, { type FC, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { paths } from "@/shared/const";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { TabBar } from "@/shared/components/tabs/tab-bar";
import { Tab } from "@/shared/components/tabs/tab";
import { TabContextProvider } from "@/shared/components/tabs/tab-context";
import { TabPanel } from "@/shared/components/tabs/tab-panel";
import { ProfileHome } from "@/features/users/components/profile-home";
import type { HandleChange } from "@/shared/components/tabs/types";

import { UserPostsPage } from "../user-posts-page";
import { UserOverview } from "../user-overview";
import type { HasUser } from "../../types";

export const ProfileStyled = styled.section`
    display: flex;
    justify-content: space-between;
    column-gap: 1rem;
    height: 100%;
`;

export const TabsWrapStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 3rem;
    width: 100%;
`;

export const ContentWrapStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    height: 100%;
`;

export const Profile: FC<HasUser> = ({ user }) => {
    const navigate = useNavigate();
    const { tab } = useParams();
    const { t } = useTranslation();

    const { profile } = useAuthContext();

    const slug = user?.slug ?? "";
    const isAuthUser = profile?.id === user.id;

    const homePath = createAbsoluteUsersPath(slug);
    const postsPath = createAbsoluteUsersPath(slug, paths.POSTS);
    const commentsPath = createAbsoluteUsersPath(slug, paths.COMMENTS);
    const settingsPath = createAbsoluteUsersPath(slug, paths.SETTINGS);
    const initialTabValue = tab
        ? createAbsoluteUsersPath(slug, tab)
        : createAbsoluteUsersPath(slug);

    const handleChange = useCallback<HandleChange>((value) => {
        navigate(value);
    }, [navigate]);

    return (
        <ProfileStyled>
            <TabsWrapStyled>
                <UserOverview user={user} />

                <ContentWrapStyled>
                    <TabContextProvider onChange={handleChange} initialValue={initialTabValue}>
                        <TabBar>
                            <Tab value={homePath} label={t("users.profile.home.title")} />
                            <Tab value={postsPath} label={t("users.profile.posts.title")} />
                            <Tab value={commentsPath} label={t("users.profile.comments.title")} />
                            {isAuthUser && (
                                <Tab value={settingsPath} label={t("users.profile.settings.title")} />
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
                </ContentWrapStyled>
            </TabsWrapStyled>
        </ProfileStyled>
    );
};
