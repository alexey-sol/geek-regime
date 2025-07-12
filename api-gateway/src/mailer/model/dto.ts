export type SendEmailRequest = {
    from_email: string;
    from_name: string;
    to: string;
    subject: string;
    html: string;
};
