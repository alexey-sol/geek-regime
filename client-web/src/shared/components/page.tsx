import React, { type FC, type PropsWithChildren } from "react";
import styled from "styled-components";

import { Paging } from "@/shared/components/paging";
import type { PagingOptions } from "@/shared/types";
import type { UsePagingDataArg } from "@/shared/components/paging/types";

export const PageStyled = styled.section`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

export const InnerStyled = styled.section`
    padding-bottom: ${({ theme }) => theme.components.main.paddingY};
`;

type PageProps = PropsWithChildren<Pick<UsePagingDataArg, "pathPrefix"> & {
    pagingOptions: PagingOptions;
}>;

export const Page: FC<PageProps> = ({
    children,
    pagingOptions,
    pathPrefix,
}) => {
    const { page, size, totalElements } = pagingOptions;

    return (
        <PageStyled>
            <InnerStyled>
                {children}
            </InnerStyled>

            <Paging
                page={page}
                pathPrefix={pathPrefix}
                size={size}
                totalElements={totalElements}
            />
        </PageStyled>
    );
};
