import React from "react";

import { PostOverview } from "./post-overview";

import { render, screen } from "@/features/posts/test/setup";
import { toPostPreview } from "@/features/posts/utils/converters";
import { paths } from "@/shared/const";
import { type PostPreviewResponse } from "@/features/posts/models/dtos";

const DATE_TIME = "2022-02-01T07:20:00.000Z";
const TITLE = "Title";
const EXCERPT = "Excerpt";

const RESPONSE: PostPreviewResponse = {
    id: 1,
    title: TITLE,
    excerpt: EXCERPT,
    createdAt: DATE_TIME,
    updatedAt: DATE_TIME,
    slug: "title",
    author: {
        id: 1,
        email: "mark@gmail.com",
        slug: "mark",
        createdAt: DATE_TIME,
        updatedAt: DATE_TIME,
        lastSeenAt: DATE_TIME,
        details: {
            createdAt: DATE_TIME,
            updatedAt: DATE_TIME,
            image: "",
            name: "Mark",
            gender: "MALE",
        },
    },
    meta: {
        id: 1,
        rating: 0,
        viewCount: 0,
        commentCount: 0,
    },
    spaces: [],
};

const POST = toPostPreview(RESPONSE);

describe("Posts/UserOverview", () => {
    it("renders title and excerpt from provided post", () => {
        render(<PostOverview item={POST} />);

        screen.getByText(TITLE);
        screen.getByText(EXCERPT);
    });

    it("renders link containing slug from provided post", () => {
        render(<PostOverview item={POST} />);

        const link = screen.getByTestId("post-overview/post-slug-link");
        expect(link).toHaveAttribute("href", `/${paths.POSTS}/${POST.slug}`);
    });
});
