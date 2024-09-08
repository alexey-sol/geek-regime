import { Expose, Transform, Type } from "class-transformer";
import { sanitize } from "dompurify";

import { formatTimestamp } from "@/shared/utils/formatters/date";
import { User } from "@/features/users/models/entities";

export class PostMeta {
    constructor(
        public id: number,
        public rating: number,
        public viewCount: number,
    ) {}
}

export class UserPostPreview {
    @Type(() => User)
    public author: User;

    @Type(() => PostMeta)
    public meta: PostMeta;

    constructor(
        public id: number,
        public title: string,
        public excerpt: string,
        public slug: string,
        public createdAt: string,
        public updatedAt: string,
        author: User,
    ) {
        this.author = author;
    }

    get formattedCreatedAt(): string {
        return formatTimestamp(this.createdAt);
    }

    get formattedUpdatedAt(): string {
        return formatTimestamp(this.updatedAt);
    }
}

export class UserPostDetails extends UserPostPreview {
    @Expose()
    @Transform(({ value }) => sanitize(value))
    public body: string;

    constructor(
        id: number,
        title: string,
        excerpt: string,
        slug: string,
        createdAt: string,
        updatedAt: string,
        author: User,
        body: string,
    ) {
        super(id, title, excerpt, slug, createdAt, updatedAt, author);
        this.body = body;
    }
}
