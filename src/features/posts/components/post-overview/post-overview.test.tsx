import React from "react";

import { render, screen } from "@/test/setup";
import { PostDto } from "@/features/posts/models/dtos";
import { fromPostDtoToEntity } from "@/features/posts/utils/converters";
import { path } from "@/shared/const";

import { PostOverview } from "./post-overview";

const timestamp = "2022-02-01T07:20:00.000Z";
const title = "Title";
const excerpt = "Excerpt";

const postDto: PostDto = {
    id: 1,
    title,
    excerpt,
    createdAt: timestamp,
    updatedAt: timestamp,
    slug: "title",
    body: "Body",
    author: {
        id: 1,
        email: "mark@gmail.com",
        createdAt: timestamp,
        updatedAt: timestamp,
        details: {
            createdAt: timestamp,
            updatedAt: timestamp,
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

        screen.getByText(title);
        screen.getByText(excerpt);
    });

    it("should construct and render concise post info", () => {
        const postInfo = `${post.author.details.name} – ${post.formattedCreatedAt}`;

        render(<PostOverview post={post} />);

        screen.getByText(postInfo);
    });

    it("should render link with path containing slug from provided list", () => {
        render(<PostOverview post={post} />);

        const linkElement = screen.getByRole("link");
        expect(linkElement).toHaveAttribute("href", `/${path.POSTS}/${post.slug}`);
    });
});
