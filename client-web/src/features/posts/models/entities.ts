import { Expose, Transform, Type } from "class-transformer";
import { sanitize } from "dompurify";

import { formatTimestamp } from "@/shared/utils/formatters/date";
import { User } from "@/features/users/models/entities";

export class Post {
    @Expose()
    @Transform(({ value }) => sanitize(value))
    public body: string;

    @Type(() => User)
    public author: User;

    constructor(
        public id: number,
        public title: string,
        public excerpt: string,
        public slug: string,
        public createdAt: string,
        public updatedAt: string,
        body: string,
        author: User,
    ) {
        this.body = body;
        this.author = author;
    }

    @Expose()
    get formattedCreatedAt() {
        return formatTimestamp(this.createdAt);
    }

    @Expose()
    get formattedUpdatedAt() {
        return formatTimestamp(this.updatedAt);
    }
}
