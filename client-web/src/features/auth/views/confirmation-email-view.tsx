import React, { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { LinkButton } from "@eggziom/geek-regime-js-ui-kit/components/button";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";
import { useSearchParams } from "react-router-dom";
import throttle from "lodash/throttle";

import { QUERY_PARAMS } from "@/features/auth/const";
import { useLazyResendEmailConfirmationQuery } from "@/features/auth/services/api";
import { notify } from "@/app/store/actions";
import { createSuccessSnackbarArg } from "@/features/feedback/slice/utils";
import { useAppDispatch } from "@/app/store/hooks";

const RESEND_EMAIL_WAIT_MS = 10_000;

export const ConfirmationEmailView: FC = () => {
    const dispatch = useAppDispatch();
    const [resendEmailConfirmation, { isFetching }] = useLazyResendEmailConfirmationQuery();

    const [searchParams] = useSearchParams();
    const { t } = useTranslation();

    const email = searchParams.get(QUERY_PARAMS.EMAIL);

    const throttledResendEmailConfirmation = useMemo(() => throttle(
        () => email && resendEmailConfirmation({ email }).unwrap()
            .then(() => dispatch(notify(
                createSuccessSnackbarArg(t("auth.confirmation.email.query.resendEmail.success")),
            )))
            .catch(console.error),
        RESEND_EMAIL_WAIT_MS,
    ), [dispatch, email, resendEmailConfirmation, t]);

    return (
        <section>
            <Typography>
                {t("auth.confirmation.email.view.text")}
            </Typography>

            {!!email && (
                <LinkButton disabled={isFetching} onClick={throttledResendEmailConfirmation}>
                    {t("auth.confirmation.email.view.actions.resendButton.title")}
                </LinkButton>
            )}
        </section>
    );
};
