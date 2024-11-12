import React, { type FC } from "react";
import { useTranslation } from "react-i18next";

import { RatingIcon } from "@/shared/components/icon";

import { getCappedCountLabel, getRatingColor } from "./utils";
import { MetaItem } from "./meta-item";
import { type HasPostMeta } from "./types";

export const ItemRatingReadonly: FC<HasPostMeta> = ({ meta }) => {
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
