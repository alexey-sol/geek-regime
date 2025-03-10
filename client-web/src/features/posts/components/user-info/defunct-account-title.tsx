import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import { Tooltip } from "@/shared/components/tooltip";

export const DefunctAccountTitle: FC = () => {
    const { t } = useTranslation();

    return (
        <Tooltip message={t("posts.post.author.name.default.tooltip")}>
            <Typography color="grey">
                {t("posts.post.author.name.default.title")}
            </Typography>
        </Tooltip>
    );
};
