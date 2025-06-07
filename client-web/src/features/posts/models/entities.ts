import {
    Expose, Transform, TransformFnParams, Type,
} from "class-transformer";
import { t } from "i18next";

import { formatTimestamp } from "@/shared/utils/formatters/date";
import { Space } from "@/features/spaces/models/entities";
import { User } from "@/features/users/models/entities";
import { purifyHtml } from "@/shared/utils/helpers/dom";

export class PostMeta {
    constructor(
        public id: number,
        public rating: number,
        public viewCount: number,
        public commentCount: number,
    ) {}

    get localizedRatingNumber(): string {
        return this.rating.toLocaleString();
    }

    get localizedViewCountNumber(): string {
        return this.viewCount.toLocaleString();
    }
}

export class PostVote {
    constructor(
        public id: number,
        public userId: number,
        public value: number,
    ) {}
}

export class PostPreview {
    @Type(() => User)
    public author?: User;

    @Type(() => PostMeta)
    public meta: PostMeta;

    @Type(() => Space)
    public spaces: Space[];

    constructor(
        public id: number,
        public title: string,
        public excerpt: string,
        public slug: string,
        public createdAt: string,
        public updatedAt: string,
    ) {}

    get formattedCreatedAt(): string {
        return formatTimestamp(this.createdAt);
    }

    get formattedUpdatedAt(): string {
        return formatTimestamp(this.updatedAt);
    }

    public isAuthor = (user?: User): boolean => !!user && user.id === this.author?.id;

    public isRateable = (user?: User): boolean => !!user && !this.isAuthor(user);
}

export class PostDetails extends PostPreview {
    @Expose()
    @Transform(({ value }) => purifyHtml(value))
    public body: string;

    @Type(() => PostVote)
    public votes: PostVote[];

    @Type(() => Space)
    public spaces: Space[];

    constructor(
        id: number,
        title: string,
        excerpt: string,
        slug: string,
        createdAt: string,
        updatedAt: string,
        body: string,
        votes: PostVote[],
        spaces: Space[],
        author?: User,
    ) {
        super(id, title, excerpt, slug, createdAt, updatedAt);
        this.body = body;
        this.votes = votes;
        this.spaces = spaces;
        this.author = author;
    }
}

const transformPostCommentBody = ({ value }: TransformFnParams) => (value
    ? purifyHtml(value)
    : t("posts.post.comments.isDeleted.placeholder"));

export class PostCommentBase {
    @Expose()
    @Transform(transformPostCommentBody)
    public body: string;

    @Type(() => User)
    public author?: User;

    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        author?: User,
        body?: string | null,
        public isDeleted = false,
    ) {
        this.author = author;
        this.body = body ?? "";
    }

    get formattedCreatedAt(): string {
        return formatTimestamp(this.createdAt);
    }

    get formattedUpdatedAt(): string {
        return formatTimestamp(this.updatedAt);
    }

    public isAuthor = (user?: User): boolean => !!user && user.id === this.author?.id;
}

export class PostComment extends PostCommentBase {
    @Type(() => User)
    public author?: User;

    constructor(
        id: number,
        createdAt: string,
        updatedAt: string,
        author?: User,
        body?: string | null,
        isDeleted?: boolean,
        public descendantCount = 0,
    ) {
        super(id, createdAt, updatedAt, author, body, isDeleted);
    }

    get formattedCreatedAt(): string {
        return formatTimestamp(this.createdAt);
    }

    get formattedUpdatedAt(): string {
        return formatTimestamp(this.updatedAt);
    }
}

export class PostCommentTree extends PostCommentBase {
    @Type(() => User)
    public author?: User;

    @Type(() => PostCommentTree)
    public replies: PostCommentTree[]; // eslint-disable-line no-use-before-define

    constructor(
        id: number,
        createdAt: string,
        updatedAt: string,
        author?: User,
        body?: string | null,
        isDeleted?: boolean,
        replies: PostCommentTree[] = [],
    ) {
        super(id, createdAt, updatedAt, author, body, isDeleted);
        this.replies = replies;
    }

    get formattedCreatedAt(): string {
        return formatTimestamp(this.createdAt);
    }

    get formattedUpdatedAt(): string {
        return formatTimestamp(this.updatedAt);
    }
}
