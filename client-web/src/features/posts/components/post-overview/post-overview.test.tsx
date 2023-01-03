import React from "react";

import { render, screen } from "@/test/setup";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import { paths } from "@/shared/const";
import type { PostDto } from "@/features/posts/models/dtos";

import { PostOverview } from "./post-overview";

const TIMESTAMP = "2022-02-01T07:20:00.000Z";
const TITLE = "Title";
const EXCERPT = "Excerpt";

const postDto: PostDto = {
    id: 1,
    title: TITLE,
    excerpt: EXCERPT,
    createdAt: TIMESTAMP,
    updatedAt: TIMESTAMP,
    slug: "title",
    body: "Body",
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

const post = fromPostDtoToEntity(postDto);

describe("PostOverview", () => {
    it("should render title and excerpt from provided post", () => {
        render(<PostOverview post={post} />);

        screen.getByText(TITLE);
        screen.getByText(EXCERPT);
    });

    it("should construct and render concise post info", () => {
        const postInfo = `${post.author.details.name} – ${post.formattedCreatedAt}`;

        render(<PostOverview post={post} />);

        screen.getByText(postInfo);
    });

    it("should render link with path containing slug from provided list", () => {
        render(<PostOverview post={post} />);

        const linkElement = screen.getByRole("link");
        expect(linkElement).toHaveAttribute("href", `/${paths.POSTS}/${post.slug}`);
    });
});
