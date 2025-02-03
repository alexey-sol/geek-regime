import React, {
    type FC, useCallback, useRef, useState,
} from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";

import { createAbsoluteSearchPath } from "@/features/search/utils/helpers";
import { SearchBox } from "@/features/search/components/search-box";
import { SearchOutput } from "@/features/search/components/search-output";
import { TabContextProvider } from "@/shared/components/tabs/tab-context";
import { SEARCH_PARAMS } from "@/shared/const";

const SearchPageStyled = styled.section`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    height: 100%;
`;

export const SearchPage: FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { resource } = useParams();

    const initialTabValue = resource
        ? createAbsoluteSearchPath(resource)
        : createAbsoluteSearchPath();

    const elementRef = useRef<HTMLElement>(null);

    const initialSearchText = searchParams.get(SEARCH_PARAMS.TEXT) ?? "";

    const [searchText, setSearchText] = useState(initialSearchText);

    const navigateToSearch = useCallback((pathname: string) => {
        const urlSearchParams = new URLSearchParams(searchParams);
        urlSearchParams.set(SEARCH_PARAMS.TEXT, searchText);

        const search = searchText && createSearchParams(urlSearchParams).toString();

        navigate({ pathname, search });
    }, [navigate, searchParams, searchText]);

    return (
        <SearchPageStyled ref={elementRef}>
            <SearchBox
                navigateToSearch={navigateToSearch}
                searchText={searchText}
                setSearchText={setSearchText}
            />

            <TabContextProvider onChange={navigateToSearch} initialValue={initialTabValue}>
                <SearchOutput />
            </TabContextProvider>
        </SearchPageStyled>
    );
};
