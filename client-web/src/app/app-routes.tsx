import React, { type FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { paths } from "@/shared/const";

const PostCreateView = lazy(() => import("@/features/posts/views/post-create-view"));
const PostDetailsView = lazy(() => import("@/features/posts/views/post-details-view"));
const PostListView = lazy(() => import("@/features/posts/views/post-list-view"));
const PostUpdateView = lazy(() => import("@/features/posts/views/post-update-view"));
const UserDetailsView = lazy(() => import("@/features/users/views/user-details-view"));

export const AppRoutes: FC = () => (
    <Routes>
        <Route index element={<div>Home</div>} />
        <Route path={paths.POSTS}>
            <Route index element={<PostListView />} />
            <Route path={`${paths.PAGE}-:page`} element={<PostListView />} />
            <Route path={paths.CREATE} element={<PostCreateView />} />
            <Route path=":slug">
                <Route index element={<PostDetailsView />} />
                <Route path={paths.UPDATE} element={<PostUpdateView />} />
            </Route>
        </Route>
        <Route path={paths.USERS}>
            <Route path=":slug">
                <Route index element={<UserDetailsView />} />
            </Route>
        </Route>
        <Route path="*" element={<div>404</div>} />
    </Routes>
);
