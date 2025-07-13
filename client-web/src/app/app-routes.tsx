import React, { type FC, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PostListView from "@/features/posts/views/post-list-view"; // [1]
import { ConfirmationDoneView } from "@/features/auth/views/confirmation-done-view";
import { ConfirmationEmailView } from "@/features/auth/views/confirmation-email-view";
import { NotFoundView } from "@/shared/views/not-found-view";
import { paths } from "@/shared/const";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { AuthRoute, DefaultSearchRoute } from "@/shared/utils/routes";

const PostBySpaceListView = lazy(() => import("@/features/posts/views/post-by-space-list-view"));
const PostCreateView = lazy(() => import("@/features/posts/views/post-create-view"));
const PostDetailsView = lazy(() => import("@/features/posts/views/post-details-view"));
const PostUpdateView = lazy(() => import("@/features/posts/views/post-update-view"));
const ProfileView = lazy(() => import("@/features/users/views/profile-view"));
const SearchView = lazy(() => import("@/features/search/views/search-view"));
const SpaceListView = lazy(() => import("@/features/spaces/views/space-list-view"));
const UserListView = lazy(() => import("@/features/users/views/user-list-view"));

export const AppRoutes: FC = () => (
    <Routes>
        <Route index element={<Navigate to={paths.POSTS} />} />
        <Route path={paths.POSTS}>
            <Route index element={<PostListView />} />
            <Route path={`${paths.PAGE}-:page`} element={<PostListView />} />
            <Route
                path={paths.CREATE}
                element={(
                    <AuthRoute redirectPath={createAbsolutePostsPath()}>
                        <PostCreateView />
                    </AuthRoute>
                )}
            />
            <Route path=":slug">
                <Route index element={<PostDetailsView />} />
                <Route
                    path={paths.UPDATE}
                    element={(
                        <AuthRoute redirectPath={createAbsolutePostsPath()}>
                            <PostUpdateView />
                        </AuthRoute>
                    )}
                />
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
        <Route path={paths.CONFIRMATION}>
            <Route index element={<Navigate to={paths.INDEX} />} />
            <Route path={paths.EMAIL} element={<ConfirmationEmailView />} />
            <Route path={paths.DONE} element={<ConfirmationDoneView />} />
        </Route>
        <Route path="*" element={<NotFoundView />} />
    </Routes>
);

// [1]. Load the home page eagerly, the rest should be loaded in a lazy way.
