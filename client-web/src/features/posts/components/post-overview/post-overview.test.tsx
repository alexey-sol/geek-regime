import React from "react";

import { render, screen } from "@/test/setup";
import { fromPostPreviewDtoToEntity } from "@/features/posts/utils/converters";
import { paths } from "@/shared/const";
import type { PostPreviewDto } from "@/features/posts/models/dtos";

import { PostOverview } from "./post-overview";

const TIMESTAMP = "2022-02-01T07:20:00.000Z";
const TITLE = "Title";
const EXCERPT = "Excerpt";

const PREVIEW_DTO: PostPreviewDto = {
    id: 1,
    title: TITLE,
    excerpt: EXCERPT,
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    slug: "title",
    author: {
        id: 1,
        email: "mark@gmail.com",
        createdAt: TIMESTAMP,
        updatedAt: TIMESTAMP,
        details: {
            createdAt: TIMESTAMP,
            updatedAt: TIMESTAMP,
            image: null,
            name: "Mark",
            gender: "MALE",
        },
    },
};

const POST = fromPostPreviewDtoToEntity(PREVIEW_DTO);

describe("Posts/PostOverview", () => {
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
