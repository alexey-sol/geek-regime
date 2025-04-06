import React, { type FC } from "react";
import { Button } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { Tooltip } from "@/shared/components/tooltip";
import { type PostPagePeriod } from "@/features/posts/models/dtos";
import { type PostSortValue } from "@/features/posts/types";
import { Select } from "@/shared/components/form/select";

import { PageSettingsStyled } from "./style";
import { usePageSettings } from "./utils";

export const PageSettings: FC = () => {
    const { t } = useTranslation();
    const {
        handlePeriodChange,
        handleSortChange,
        handleSubmit,
        settings,
    } = usePageSettings();

    const mapSortValueToTranslation: Record<PostSortValue, string> = {
        LATEST: t("posts.page.settings.sort.latest"),
        OLDEST: t("posts.page.settings.sort.oldest"),
    };

    const mapPeriodValueToTranslation: Record<PostPagePeriod, string> = {
        OVERALL: t("posts.page.settings.period.overall"),
        DAY: t("posts.page.settings.period.day"),
        WEEK: t("posts.page.settings.period.week"),
        MONTH: t("posts.page.settings.period.month"),
        YEAR: t("posts.page.settings.period.year"),
    };

    return (
        <PageSettingsStyled>
            <Tooltip message={t("posts.page.settings.sortSelect.tooltip")}>
                <Select onChange={handleSortChange} value={settings.sort}>
                    {Object.entries(mapSortValueToTranslation).map(([value, translation]) => (
                        <option key={value} value={value}>{translation}</option>
                    ))}
                </Select>
            </Tooltip>

            <Tooltip message={t("posts.page.settings.periodSelect.tooltip")}>
                <Select onChange={handlePeriodChange} value={settings.period}>
                    {Object.entries(mapPeriodValueToTranslation).map(([value, translation]) => (
                        <option key={value} value={value}>{translation}</option>
                    ))}
                </Select>
            </Tooltip>

            <Button fontSize="sm" onClick={handleSubmit} view="secondary">
                {t("posts.page.settings.applyButton.title")}
            </Button>
        </PageSettingsStyled>
    );
};
