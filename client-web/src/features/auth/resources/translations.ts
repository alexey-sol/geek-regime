export const en = {
    auth: {
        profile: {
            actions: {
                profile: "Profile",
                signOut: "Sign out",
            },
        },
        signIn: {
            local: {
                actionButton: {
                    title: "Sign in",
                },
                fields: {
                    email: "Email",
                    password: "Password",
                },
            },
            query: {
                forbiddenOrNotFoundError: "User doesn't exist or password is invalid",
            },
            oauth: {
                providers: {
                    yandex: {
                        consentScreen: {
                            title: "Signing in via Yandex",
                        },
                        name: "Yandex",
                    },
                },
                suggestion: {
                    preface: "Also you can sign in using these services:",
                },
            },
            signUp: {
                suggestion: {
                    preface: "Or maybe you don't have an account at all? Then you can ",
                    link: "create a new one!",
                },
            },
            title: "Signing In",
        },
        signUp: {
            actionButton: {
                title: "Sign up",
            },
            fields: {
                confirmPassword: "Confirm password",
                email: "Email",
                password: "Password",
                name: "Name",
            },
            query: {
                emailAlreadyExistsError: "Such email is already occupied",
                success: "You've signed up",
            },
            title: "Signing Up",
        },
        errors: {
            validation: {
                confirmPasswordEmpty: "Confirm password",
                emailEmpty: "Specify email",
                emailInvalid: "Specify valid email",
                nameEmpty: "Specify name",
                nameTooLong: "Name is too long",
                nameTooShort: "Name is too short",
                passwordEmpty: "Specify password",
                passwordsNotMatch: "Passwords don't match",
            },
        },
    },
};

export const ru = {
    auth: {
        profile: {
            actions: {
                profile: "Профиль",
                signOut: "Выйти",
            },
        },
        signIn: {
            local: {
                actionButton: {
                    title: "Войти",
                },
                fields: {
                    email: "Email",
                    password: "Пароль",
                },
            },
            query: {
                forbiddenOrNotFoundError: "Пользователь не найден или указан неверный пароль",
            },
            oauth: {
                providers: {
                    yandex: {
                        consentScreen: {
                            title: "Вход с помощью Яндекса",
                        },
                        name: "Яндекс",
                    },
                },
                suggestion: {
                    preface: "А еще можно войти с помощью таких сервисов:",
                },
            },
            signUp: {
                suggestion: {
                    preface: "Или вовсе нет аккаунта? Тогда можно ",
                    link: "зарегистрироваться!",
                },
            },
            title: "Вход",
        },
        signUp: {
            actionButton: {
                title: "Зарегистрироваться",
            },
            fields: {
                confirmPassword: "Пароль еще раз",
                email: "Email",
                name: "Имя",
                password: "Пароль",
            },
            query: {
                emailAlreadyExistsError: "Такой email уже занят",
                success: "Регистрация прошла успешно",
            },
            title: "Регистрация",
        },
        errors: {
            validation: {
                confirmPasswordEmpty: "Введите пароль еще раз",
                emailEmpty: "Укажите email",
                emailInvalid: "Укажите корректный email",
                nameEmpty: "Укажите имя",
                nameTooLong: "Имя слишком длинное",
                nameTooShort: "Имя слишком короткое",
                passwordEmpty: "Введите пароль",
                passwordsNotMatch: "Пароли не совпадают",
            },
        },
    },
};
