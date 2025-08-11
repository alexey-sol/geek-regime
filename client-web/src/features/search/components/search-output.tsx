import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { resources } from "@eggziom/geek-regime-js-utils";
import { Tab, TabBar, TabPanel } from "@eggziom/geek-regime-js-ui-kit/components/tabs";

import { createAbsoluteSearchPath, getSearchBoxTitleKey } from "../utils/helpers";

import { paths } from "@/shared/const";
import { UsersPage } from "@/features/users/components/users-page";
import { SpacesPage } from "@/features/spaces/components/spaces-page";
import { PostsPage } from "@/features/posts/components/posts-page";

const SEARCH_POSTS_PATH = createAbsoluteSearchPath(paths.POSTS);
const SEARCH_USERS_PATH = createAbsoluteSearchPath(paths.USERS);
const SEARCH_SPACES_PATH = createAbsoluteSearchPath(paths.SPACES);

export const SearchOutput = memo(() => {
    const { t } = useTranslation();

    return (
        <>
            <TabBar>
                <Tab value={SEARCH_POSTS_PATH} label={t(getSearchBoxTitleKey(resources.POSTS))} />
                <Tab value={SEARCH_USERS_PATH} label={t(getSearchBoxTitleKey(resources.USERS))} />
                <Tab value={SEARCH_SPACES_PATH} label={t(getSearchBoxTitleKey(resources.SPACES))} />
            </TabBar>

            <TabPanel value={SEARCH_POSTS_PATH}>
                <PostsPage pathPrefix={SEARCH_POSTS_PATH} />
            </TabPanel>

            <TabPanel value={SEARCH_USERS_PATH}>
                <UsersPage pathPrefix={SEARCH_USERS_PATH} />
            </TabPanel>

            <TabPanel value={SEARCH_SPACES_PATH}>
                <SpacesPage pathPrefix={SEARCH_SPACES_PATH} />
            </TabPanel>
        </>
    );
});
