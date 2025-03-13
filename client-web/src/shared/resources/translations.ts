const EN: Record<string, string> = {
    POST_NOT_FOUND: "Post is not found",
    USER_NOT_FOUND: "User is not found",
};

const RU: Record<string, string> = {
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
                        ABSENT: "User doesn't exist or password is incorrect",
                        MISMATCH: "User doesn't exist or password is incorrect",
                    },
                    id: {
                        ABSENT: EN.USER_NOT_FOUND,
                    },
                    slug: {
                        ABSENT: EN.USER_NOT_FOUND,
                    },
                },
            },
        },
        navbar: {
            authorsTab: {
                title: "Authors",
            },
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
                        ABSENT: "Такого пользователя не существует или указан неверный пароль",
                        MISMATCH: "Такого пользователя не существует или указан неверный пароль",
                    },
                    id: {
                        ABSENT: RU.USER_NOT_FOUND,
                    },
                    slug: {
                        ABSENT: RU.USER_NOT_FOUND,
                    },
                },
            },
        },
        navbar: {
            authorsTab: {
                title: "Авторы",
            },
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
