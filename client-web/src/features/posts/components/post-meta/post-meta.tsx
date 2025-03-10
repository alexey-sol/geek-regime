import React, { type FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import { ViewIcon } from "@/shared/components/icon";
import { type PostMeta as Meta } from "@/features/posts/models/entities";

import { MetaItem } from "./meta-item";
import { PostMetaStyled } from "./style";
import { getCappedCountLabel } from "./utils";

type PostMetaProps = {
    meta: Meta;
};

export const PostMeta: FC<PropsWithChildren<PostMetaProps>> = ({
    children,
    meta,
}) => {
    const { t } = useTranslation();

    return (
        <PostMetaStyled>
            {children}

            <MetaItem
                icon={ViewIcon}
                label={getCappedCountLabel(meta.viewCount)}
                tooltipMessage={`${t("posts.post.viewCount")}: ${meta.localizedViewCountNumber}`}
            />
        </PostMetaStyled>
    );
};
