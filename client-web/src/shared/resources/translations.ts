const EN: Record<string, string> = {
    INVALID_CREDENTIALS: "User doesn't exist or password is incorrect",
    POST_NOT_FOUND: "Post is not found",
    USER_NOT_FOUND: "User is not found",
};

const RU: Record<string, string> = {
    INVALID_CREDENTIALS: "Такого пользователя не существует или указан неверный пароль",
    POST_NOT_FOUND: "Статья не найдена",
    USER_NOT_FOUND: "Пользователь не найден",
};

export const en = {
    shared: {
        actions: {
            done: "Done",
            leaveComment: "Leave a comment",
            send: "Send",
        },
        dialog: {
            closeButton: {
                tooltip: "Close",
            },
            goBackButton: {
                tooltip: "Go back",
            },
        },
        footer: {
            content: "Not much is going on in this footer. Today is actually",
        },
        query: {
            error: {
                message: {
                    default: "Something went wrong",
                    prefix: "Got an error!",
                },
                posts: {
                    id: {
                        ABSENT: EN.POST_NOT_FOUND,
                    },
                    slug: {
                        ABSENT: EN.POST_NOT_FOUND,
                    },
                },
                users: {
                    email: {
                        ALREADY_EXISTS: "This email is already occupied",
                        ABSENT: EN.INVALID_CREDENTIALS,
                        MISMATCH: EN.INVALID_CREDENTIALS,
                    },
                    id: {
                        ABSENT: EN.USER_NOT_FOUND,
                    },
                    newPassword: {
                        INVALID: "Invalid new password",
                    },
                    oldPassword: {
                        MISMATCH: "Wrong current password",
                    },
                    password: {
                        MISMATCH: EN.INVALID_CREDENTIALS,
                    },
                    slug: {
                        ABSENT: EN.USER_NOT_FOUND,
                    },
                },
            },
        },
        navbar: {
            i18nButton: {
                tooltip: "Select language",
            },
            postsTab: {
                title: "Posts",
            },
            profileButton: {
                tooltip: "Account",
            },
            searchButton: {
                tooltip: "Search",
            },
            spacesTab: {
                title: "Tags",
            },
            usersTab: {
                title: "Authors",
            },
        },
        page: {
            error: {
                notFound: {
                    title: "The page doesn't exist",
                },
            },
            settings: {
                applyButton: {
                    title: "Apply",
                },
                period: {
                    day: "Day",
                    month: "Month",
                    overall: "Overall",
                    week: "Week",
                    year: "Year",
                },
                periodSelect: {
                    tooltip: "Period",
                },
                sort: {
                    latest: "Latest",
                    oldest: "Oldest",
                },
                sortSelect: {
                    tooltip: "Show first",
                },
            },
        },
        paging: {
            content: {
                empty: "Nothing",
            },
            leapButton: {
                toEnd: {
                    title: "To end",
                    tooltip: "To page",
                },
                toStart: {
                    title: "To start",
                    tooltip: "To page",
                },
            },
            stepButton: {
                next: {
                    tooltip: "Next page",
                },
                previous: {
                    tooltip: "Previous page",
                },
            },
        },
        tooltips: {
            tryAction: "Click twice to confirm the action",
        },
    },
};

export const ru = {
    shared: {
        actions: {
            done: "Готово",
            leaveComment: "Прокомментировать",
            send: "Отправить",
        },
        dialog: {
            closeButton: {
                tooltip: "Закрыть",
            },
            goBackButton: {
                tooltip: "Назад",
            },
        },
        footer: {
            content: "Ничего сильно интересного в этом футере. Сегодня кстати",
        },
        query: {
            error: {
                message: {
                    default: "Что-то пошло не так",
                    prefix: "Ошибка!",
                },
                posts: {
                    id: {
                        ABSENT: RU.POST_NOT_FOUND,
                    },
                    slug: {
                        ABSENT: RU.POST_NOT_FOUND,
                    },
                },
                users: {
                    email: {
                        ALREADY_EXISTS: "Такой email уже занят",
                        ABSENT: RU.INVALID_CREDENTIALS,
                        MISMATCH: RU.INVALID_CREDENTIALS,
                    },
                    id: {
                        ABSENT: RU.USER_NOT_FOUND,
                    },
                    newPassword: {
                        INVALID: "Недопустимый новый пароль",
                    },
                    oldPassword: {
                        MISMATCH: "Неверный текущий пароль",
                    },
                    password: {
                        MISMATCH: RU.INVALID_CREDENTIALS,
                    },
                    slug: {
                        ABSENT: RU.USER_NOT_FOUND,
                    },
                },
            },
        },
        navbar: {
            i18nButton: {
                tooltip: "Выбрать язык",
            },
            postsTab: {
                title: "Статьи",
            },
            profileButton: {
                tooltip: "Учетная запись",
            },
            searchButton: {
                tooltip: "Поиск",
            },
            spacesTab: {
                title: "Тэги",
            },
            usersTab: {
                title: "Авторы",
            },
        },
        page: {
            error: {
                notFound: {
                    title: "Такой страницы не существует",
                },
            },
            settings: {
                applyButton: {
                    title: "Применить",
                },
                period: {
                    day: "Сутки",
                    month: "Месяц",
                    overall: "Все время",
                    week: "Неделя",
                    year: "Год",
                },
                periodSelect: {
                    tooltip: "Период",
                },
                sort: {
                    latest: "Новые",
                    oldest: "Старые",
                },
                sortSelect: {
                    tooltip: "Сначала показывать",
                },
            },
        },
        paging: {
            content: {
                empty: "Пусто",
            },
            leapButton: {
                toEnd: {
                    title: "В конец",
                    tooltip: "На страницу",
                },
                toStart: {
                    title: "В начало",
                    tooltip: "На страницу",
                },
            },
            stepButton: {
                next: {
                    tooltip: "На следующую страницу",
                },
                previous: {
                    tooltip: "На предыдущую страницу",
                },
            },
        },
        tooltips: {
            tryAction: "Нажмите дважды, чтобы подтвердить действие",
        },
    },
};
