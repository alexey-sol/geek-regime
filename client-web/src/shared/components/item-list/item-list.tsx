import React, { type ComponentType } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";
import { HasId } from "@eggziom/geek-regime-js-commons";

import { Divider } from "@/shared/components/divider";

import { ListItemStyled, ListStyled, ItemListStyled } from "./style";

type ItemListProps<E extends HasId> = {
    ItemComponent: ComponentType<{ item: E }>;
    items: E[];
    noDividers?: boolean;
};

export const ItemList = <E extends HasId>({
    ItemComponent,
    items,
    noDividers = false,
}: ItemListProps<E>) => {
    const { t } = useTranslation();

    const list = (
        <ListStyled>
            {items.map((item, index) => (
                <ListItemStyled key={item.id}>
                    {!noDividers && index > 0 && <Divider />}
                    <ItemComponent item={item} />
                </ListItemStyled>
            ))}
        </ListStyled>
    );

    const stub = (
        <Typography>
            {t("shared.paging.content.empty")}
        </Typography>
    );

    return (
        <ItemListStyled>
            {items.length > 0 ? list : stub}
        </ItemListStyled>
    );
};
