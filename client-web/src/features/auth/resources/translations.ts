export const en = {
    auth: {
        confirmation: {
            done: {
                view: {
                    text: "The account has been successfully confirmed.",
                },
            },
            email: {
                query: {
                    resendEmail: {
                        success: "The email's been sent",
                    },
                },
                view: {
                    actions: {
                        resendButton: {
                            title: "Resend confirmation email",
                        },
                    },
                    text: "Almost done. Please now check your email and follow the link we've "
                        + "sent you, to confirm your email address. Check your Spam folder if "
                        + "there's no email.",
                },
            },
        },
        profile: {
            actions: {
                createPost: "Write a post",
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
                confirmPassword: "Confirm password *",
                disableEmailConfirmation: "Disable email confirmation (test)",
                email: "Email *",
                password: "Password *",
                name: "Name *",
            },
            query: {
                success: "You've signed up",
            },
            title: "Signing Up",
        },
        errors: {
            validation: {
                confirmPasswordEmpty: "Confirm password",
                descriptionTooLong: "Description is too long",
                emailEmpty: "Specify email",
                emailInvalid: "Specify valid email",
                emailTooLong: "Email is too long",
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
        confirmation: {
            done: {
                view: {
                    text: "Учетная запись успешно подтверждена.",
                },
            },
            email: {
                query: {
                    resendEmail: {
                        success: "Письмо отправлено",
                    },
                },
                view: {
                    actions: {
                        resendButton: {
                            title: "Отправить письмо еще раз",
                        },
                    },
                    text: "Почти готово. Пожалуйста, проверьте свой email и перейдите по ссылке, "
                        + "которую мы отправили вам, чтобы подтвердить свой адрес электронной "
                        + "почты. Загляните в папку Спам, если не видите письма.",
                },
            },
        },
        profile: {
            actions: {
                createPost: "Новая статья",
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
                confirmPassword: "Пароль еще раз *",
                disableEmailConfirmation: "Отключить подтверждение email (тест)",
                email: "Email *",
                name: "Имя *",
                password: "Пароль *",
            },
            query: {
                success: "Регистрация прошла успешно",
            },
            title: "Регистрация",
        },
        errors: {
            validation: {
                confirmPasswordEmpty: "Введите пароль еще раз",
                descriptionTooLong: "Описание слишком длинное",
                emailEmpty: "Укажите email",
                emailInvalid: "Укажите корректный email",
                emailTooLong: "Email слишком длинный",
                nameEmpty: "Укажите имя",
                nameTooLong: "Имя слишком длинное",
                nameTooShort: "Имя слишком короткое",
                passwordEmpty: "Введите пароль",
                passwordsNotMatch: "Пароли не совпадают",
            },
        },
    },
};
