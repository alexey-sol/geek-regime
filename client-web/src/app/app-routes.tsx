import React, { type FC, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { paths } from "@/shared/const";

const PostBySpaceListView = lazy(() => import("@/features/posts/views/post-by-space-list-view"));
const PostCreateView = lazy(() => import("@/features/posts/views/post-create-view"));
const PostDetailsView = lazy(() => import("@/features/posts/views/post-details-view"));
const PostListView = lazy(() => import("@/features/posts/views/post-list-view"));
const PostUpdateView = lazy(() => import("@/features/posts/views/post-update-view"));
const ProfileView = lazy(() => import("@/features/users/views/profile-view"));
const SearchView = lazy(() => import("@/features/search/views/search-view"));
const SpaceListView = lazy(() => import("@/features/spaces/views/space-list-view"));
const UserListView = lazy(() => import("@/features/users/views/user-list-view"));

const DefaultSearchRoute = () => <Navigate to={`/${paths.SEARCH}/${paths.POSTS}`} />;

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
            <Route index element={<UserListView />} />
            <Route path={`${paths.PAGE}-:page`} element={<UserListView />} />
            <Route path=":slug">
                <Route index element={<ProfileView />} />
                <Route path=":tab">
                    <Route index element={<ProfileView />} />
                    <Route path={`${paths.PAGE}-:page`} element={<ProfileView />} />
                </Route>
                <Route path="*" element={<ProfileView />} />
            </Route>
        </Route>
        <Route path={paths.SPACES}>
            <Route index element={<SpaceListView />} />
            <Route path={`${paths.PAGE}-:page`} element={<SpaceListView />} />
            <Route path=":slug">
                <Route path={paths.POSTS}>
                    <Route index element={<PostBySpaceListView />} />
                    <Route path={`${paths.PAGE}-:page`} element={<PostBySpaceListView />} />
                </Route>
            </Route>
        </Route>
        <Route path={paths.SEARCH}>
            <Route index element={<DefaultSearchRoute />} />
            <Route path=":resource">
                <Route index element={<SearchView />} />
                <Route path={`${paths.PAGE}-:page`} element={<SearchView />} />
            </Route>
        </Route>
        <Route path="*" element={<div>404</div>} />
    </Routes>
);
