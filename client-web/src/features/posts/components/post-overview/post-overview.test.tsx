import React from "react";

import { render, screen } from "@/features/posts/test/setup";
import { toUserPostPreview } from "@/features/posts/utils/converters";
import { paths } from "@/shared/const";
import { UserPostPreviewResponse } from "@/features/posts/models/dtos";

import { PostOverview } from "./post-overview";

const DATE_TIME = "2022-02-01T07:20:00.000Z";
const TITLE = "Title";
const EXCERPT = "Excerpt";

const RESPONSE: UserPostPreviewResponse = {
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
        details: {
            createdAt: DATE_TIME,
            updatedAt: DATE_TIME,
            image: "",
            name: "Mark",
            gender: "MALE",
        },
    },
};

const POST = toUserPostPreview(RESPONSE);

describe("Posts/UserOverview", () => {
    it("renders title and excerpt from provided post", () => {
        render(<PostOverview post={POST} />);

        screen.getByText(TITLE);
        screen.getByText(EXCERPT);
    });

    it("creates and renders concise post info", () => {
        const postInfo = `${POST.author.details.name} – ${POST.formattedCreatedAt}`;

        render(<PostOverview post={POST} />);

        screen.getByText(postInfo);
    });

    it("renders link containing slug from provided post", () => {
        render(<PostOverview post={POST} />);

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/${paths.POSTS}/${POST.slug}`);
    });
});
