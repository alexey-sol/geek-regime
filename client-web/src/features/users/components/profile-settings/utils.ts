import { PubSub } from "@/shared/utils/pub-sub";
import { ProfileSettingsValues } from "@/features/users/components/profile-settings/types";
import { getDateWithoutTime } from "@/shared/utils/formatters/date";
import { type User } from "@/features/users/models/entities";

const RESET_ABOUT = "RESET_ABOUT";

const pubSub = new PubSub();

export const publishResetAbout = (): void => pubSub.publish(RESET_ABOUT);

export const subscribeToResetAbout = (cb: () => void): void =>
    pubSub.subscribe(RESET_ABOUT, cb);

export const unsubscribeFromResetAbout = (cb: () => void): void =>
    pubSub.unsubscribe(RESET_ABOUT, cb);

export const getInitialValues = ({ details, email }: User): ProfileSettingsValues => ({
    credentials: {
        confirmPassword: "",
        newPassword: "",
        oldPassword: "",
    },
    details: {
        about: details.about ?? "",
        birthDate: details.birthDate ? getDateWithoutTime(details.birthDate) : "",
        description: details.description ?? "",
        gender: details.gender,
        name: details.name,
    },
    email,
});
