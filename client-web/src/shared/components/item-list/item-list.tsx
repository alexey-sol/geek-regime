import React, { type ComponentType } from "react";
import { Divider } from "@eggziom/geek-regime-js-ui-kit/components/divider";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { useTranslation } from "react-i18next";
import { type HasId } from "@eggziom/geek-regime-js-utils";

import { ListItemStyled, ListStyled } from "./style";

type ItemListProps<E extends HasId> = {
    ItemComponent: ComponentType<{ item: E }>;
    items: E[];
};

export const ItemList = <E extends HasId>({
    ItemComponent,
    items,
}: ItemListProps<E>): JSX.Element => {
    const { t } = useTranslation();

    const list = (
        <ListStyled>
            {items.map((item, index) => (
                <ListItemStyled key={item.id}>
                    {index > 0 && <Divider />}
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
        <section>
            {items.length > 0 ? list : stub}
        </section>
    );
};
