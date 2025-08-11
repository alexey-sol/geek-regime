import React, {
    type ChangeEventHandler, type FormEventHandler, memo, useEffect, useRef,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { SearchIconButton } from "@eggziom/geek-regime-js-ui-kit/components/icon-button";

import { createAbsoluteSearchPath, getSearchBoxPlaceholderKey } from "../utils/helpers";

import { Input } from "@/shared/components/form/input";
import { paths } from "@/shared/const";

const SearchFormStyled = styled.form`
    position: relative;
    display: flex;
    align-items: center;
`;

const SearchIconButtonWrapper = styled.section`
    position: absolute;
    right: 0;
    padding: 0 1rem;
`;

const InputStyled = styled(Input)`
    flex: 1;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    padding-right: 3.6rem;
    padding-bottom: 0;

    input {
        border: none;
    }
`;

type SearchBoxProps = {
    navigateToSearch: (pathname: string) => void;
    searchText: string;
    setSearchText: (searchText: string) => void;
};

export const SearchBox = memo<SearchBoxProps>(({ navigateToSearch, searchText, setSearchText }) => {
    const { t } = useTranslation();
    const { resource } = useParams();
    const location = useLocation();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const resourcePath = createAbsoluteSearchPath(resource ?? paths.POSTS);
        navigateToSearch(resourcePath);
    };

    const handleSearchTextChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        if (!(target instanceof HTMLInputElement)) {
            return;
        }

        setSearchText(target.value);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [location.pathname]);

    return (
        <SearchFormStyled onSubmit={handleSubmit}>
            <InputStyled
                name="search"
                onChange={handleSearchTextChange}
                placeholder={t(getSearchBoxPlaceholderKey(resource))}
                ref={inputRef}
                value={searchText}
            />

            <SearchIconButtonWrapper>
                <SearchIconButton title={t("shared.navbar.searchButton.tooltip")} type="submit" />
            </SearchIconButtonWrapper>
        </SearchFormStyled>
    );
});
