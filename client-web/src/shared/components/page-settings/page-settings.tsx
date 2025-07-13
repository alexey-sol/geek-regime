import React, { memo } from "react";
import { Button } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { Tooltip } from "@/shared/components/tooltip";
import { Select } from "@/shared/components/form/select";
import { type SortValue } from "@/shared/types";
import { type PagePeriod } from "@/shared/models/dtos";

import { PageSettingsStyled } from "./style";
import { usePageSettings } from "./utils";

export const PageSettings = memo(() => {
    const { t } = useTranslation();
    const {
        handlePeriodChange,
        handleSortChange,
        handleSubmit,
        settings,
    } = usePageSettings();

    const mapSortValueToTranslation: Record<SortValue, string> = {
        LATEST: t("shared.page.settings.sort.latest"),
        OLDEST: t("shared.page.settings.sort.oldest"),
    };

    const mapPeriodValueToTranslation: Record<PagePeriod, string> = {
        OVERALL: t("shared.page.settings.period.overall"),
        DAY: t("shared.page.settings.period.day"),
        WEEK: t("shared.page.settings.period.week"),
        MONTH: t("shared.page.settings.period.month"),
        YEAR: t("shared.page.settings.period.year"),
    };

    return (
        <PageSettingsStyled>
            <Tooltip message={t("shared.page.settings.sortSelect.tooltip")}>
                <Select onChange={handleSortChange} value={settings.sort}>
                    {Object.entries(mapSortValueToTranslation).map(([value, translation]) => (
                        <option key={value} value={value}>{translation}</option>
                    ))}
                </Select>
            </Tooltip>

            <Tooltip message={t("shared.page.settings.periodSelect.tooltip")}>
                <Select onChange={handlePeriodChange} value={settings.period}>
                    {Object.entries(mapPeriodValueToTranslation).map(([value, translation]) => (
                        <option key={value} value={value}>{translation}</option>
                    ))}
                </Select>
            </Tooltip>

            <Button fontSize="sm" onClick={handleSubmit} view="secondary">
                {t("shared.page.settings.applyButton.title")}
            </Button>
        </PageSettingsStyled>
    );
});
