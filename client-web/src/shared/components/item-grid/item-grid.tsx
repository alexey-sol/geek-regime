import React, { type ComponentType } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";
import { HasId } from "@eggziom/geek-regime-js-commons";

import { GridStyled, ItemGridStyled } from "./style";

type ItemGridProps<E extends HasId> = {
    ItemComponent: ComponentType<{ item: E }>;
    items: E[];
};

export const ItemGrid = <E extends HasId>({
    ItemComponent,
    items,
}: ItemGridProps<E>) => {
    const { t } = useTranslation();

    const grid = (
        <GridStyled>
            {items.map((item) => (
                <li key={item.id}>
                    <ItemComponent item={item} />
                </li>
            ))}
        </GridStyled>
    );

    const stub = (
        <Typography>
            {t("shared.paging.content.empty")}
        </Typography>
    );

    return (
        <ItemGridStyled>
            {items.length > 0 ? grid : stub}
        </ItemGridStyled>
    );
};
