import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { resources } from "@eggziom/geek-regime-js-commons";

import { paths } from "@/shared/const";
import { TabBar } from "@/shared/components/tabs/tab-bar";
import { Tab } from "@/shared/components/tabs/tab";
import { TabPanel } from "@/shared/components/tabs/tab-panel";
import { UsersPage } from "@/features/users/components/users-page";
import { PostsPage } from "@/features/posts/components/posts-page";

import { createAbsoluteSearchPath, getSearchBoxTitleKey } from "../utils/helpers";

const SEARCH_POSTS_PATH = createAbsoluteSearchPath(paths.POSTS);
const SEARCH_USERS_PATH = createAbsoluteSearchPath(paths.USERS);

export const SearchOutput = memo(() => {
    const { t } = useTranslation();

    return (
        <>
            <TabBar>
                <Tab value={SEARCH_POSTS_PATH} label={t(getSearchBoxTitleKey(resources.POSTS))} />
                <Tab value={SEARCH_USERS_PATH} label={t(getSearchBoxTitleKey(resources.USERS))} />
            </TabBar>

            <TabPanel value={SEARCH_POSTS_PATH}>
                <PostsPage pathPrefix={SEARCH_POSTS_PATH} />
            </TabPanel>

            <TabPanel value={SEARCH_USERS_PATH}>
                <UsersPage pathPrefix={SEARCH_USERS_PATH} />
            </TabPanel>
        </>
    );
});
