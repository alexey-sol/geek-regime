import React, { type FC } from "react";
import { useTranslation } from "react-i18next";

import { RatingIcon } from "@/shared/components/icon";
import { type PostMeta as Meta } from "@/features/posts/models/entities";

import { getCappedCountLabel, getRatingColor } from "./utils";
import { MetaItem } from "./meta-item";

type ItemRatingReadonlyProps = {
    meta: Meta;
};

export const ItemRatingReadonly: FC<ItemRatingReadonlyProps> = ({ meta }) => {
    const { t } = useTranslation();
    const ratingColor = getRatingColor(meta.rating);

    return (
        <MetaItem
            icon={RatingIcon}
            label={getCappedCountLabel(meta.rating)}
            labelColor={ratingColor}
            tooltipMessage={`${t("posts.post.rating")}: ${meta.rating}`}
        />
    );
};
