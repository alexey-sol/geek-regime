import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as p from "utils/const/pathnames";
import { SEARCH_USERS } from "utils/const/events";
import QSParser from "utils/parsers/QSParser";
import ResetSearchButton from "components/ui/ResetSearchButton";
import { searchUsersStart } from "redux/users/users.actions";
import { propTypes } from "./SearchUserInput.props";
import { setCurrentPage } from "redux/usersPaging/usersPaging.actions";
import pubsub from "utils/pubsub";
import styles from "./SearchUserInput.module.scss";

SearchUserInput.propTypes = propTypes;

function SearchUserInput ({
    history,
    location,
    onSearchUsersStart,
    onSetCurrentPage
}) {
    const qs = location.search;
    const qsParser = new QSParser(qs);
    const { st: stFromQuery = "" } = qsParser.parse();

    const [searchIsInitiated, setSearchIsInitiated] = useState(false);
    const [searchTerm, setSearchTerm] = useState(stFromQuery);

    const finalSt = searchTerm || stFromQuery;

    const resetSearch = useCallback(() => {
        if (searchTerm) {
            setSearchTerm("");
            pubsub.publish(SEARCH_USERS, "");
            onSetCurrentPage(1);
            history.push(`/${p.USERS}`);
        }
    }, [history, onSetCurrentPage, searchTerm]);

    const handleChange = ({ target }) => {
        if (!searchIsInitiated) {
            setSearchIsInitiated(true);
        }

        setSearchTerm(target.value);

        if (!target.value) {
            resetSearch();
        }
    };

    useEffect(() => {
        if (searchIsInitiated) {
            onSetCurrentPage(1);
            onSearchUsersStart({ searchTerm }, () => pubsub.publish(SEARCH_USERS, searchTerm));
        }
    }, [onSearchUsersStart, searchIsInitiated, onSetCurrentPage, resetSearch, searchTerm]);

    return (
        <div className={styles.container}>
            <input
                autoComplete="off"
                className={styles.input}
                maxLength={100}
                name="searchTerm"
                onChange={handleChange}
                placeholder={"?????????? ???????????? ???? ?????????? ?????? ???? ???????? ?? \"????????\""}
                value={searchTerm}
            />

            {Boolean(finalSt) && (
                <div className={styles.resetSearchButton}>
                    <ResetSearchButton onClick={resetSearch} />
                </div>
            )}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    onSearchUsersStart: (props, cb) => dispatch(searchUsersStart(props, cb)),
    onSetCurrentPage: (page) => dispatch(setCurrentPage(page))
});

const ConnectedSearchUserInput = connect(
    null,
    mapDispatchToProps
)(SearchUserInput);

export default withRouter(ConnectedSearchUserInput);
