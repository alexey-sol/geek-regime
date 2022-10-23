import React from "react";
import { Typography } from "@/shared/components/typography";
import { Post } from "@/features/posts/models/entities";
import differenceInMonths from "date-fns/differenceInMonths";
import { useLanguage } from "@/shared/utils/language";
import { Link } from "react-router-dom";
import { path } from "@/shared/const";
import { PostDetailsStyled } from "./style";

export type PostDetailsProps = {
    post: Post;
};

export const PostDetails = ({ post }: PostDetailsProps) => {
    const { language } = useLanguage();
    const createdMonthsAgo = differenceInMonths(new Date(post.createdAt), new Date());
    const relativeTimeFormat = new Intl.RelativeTimeFormat(language);

    const updatePostPath = `/${path.POSTS}/${post.slug}/${path.UPDATE}`;

    return (
        <PostDetailsStyled>
            <section>
                <Typography as="h2">{post.title}</Typography>
                <Typography>{post.body}</Typography>
            </section>

            <section>
                <Typography i18nKey="post.createdAt" />
                <Typography>
                    {post.getFormattedCreatedAt()}
                    {relativeTimeFormat.format(createdMonthsAgo, "months")}
                </Typography>

                <Typography i18nKey="post.updatedAt" />
                <Typography>{post.getFormattedUpdatedAt()}</Typography>
            </section>

            <section>
                <Link to={updatePostPath}>Edit</Link>
            </section>
        </PostDetailsStyled>
    );
};
