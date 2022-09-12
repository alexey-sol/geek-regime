import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const PostListView = lazy(() => import("@/features/posts/views/post-list-view"));
const PostDetailsView = lazy(() => import("@/features/posts/views/post-details-view"));

export const AppRoutes = () => (
    <Routes>
        <Route index element={<div>Home</div>} />

        <Route path="posts">
            <Route index element={<PostListView />} />
            <Route path=":slug" element={<PostDetailsView />} />
        </Route>

        <Route path="*" element={<div>404</div>} />
    </Routes>
);
