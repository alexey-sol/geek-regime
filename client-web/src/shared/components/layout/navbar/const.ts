import { type LinkProps } from "react-router-dom";

import { paths } from "@/shared/const";

type TabDataItem = Pick<LinkProps, "to"> & {
    key: string;
};

export const NAVBAR_TAB_DATA: TabDataItem[] = [
    {
        key: "shared.navbar.postsTab.title",
        to: paths.POSTS,
    },
    {
        key: "shared.navbar.usersTab.title",
        to: paths.USERS,
    },
    {
        key: "shared.navbar.spacesTab.title",
        to: paths.SPACES,
    },
];
