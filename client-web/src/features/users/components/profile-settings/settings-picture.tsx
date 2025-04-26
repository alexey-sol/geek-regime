import React, { type FC, useRef, useState } from "react";
import { LinkButton } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";
import { type HasId } from "@eggziom/geek-regime-js-commons";

import { Tooltip } from "@/shared/components/tooltip";
import { Divider } from "@/shared/components/divider";
import { useTryAction } from "@/shared/utils/hooks/use-try-action";
import { type UserDetails } from "@/features/users/models/entities";
import { useRemoveUserPictureByUserIdMutation, useUploadUserPictureMutation } from "@/features/users/services/api";

import { ColumnStyled, FitContentWrapStyled } from "./styles";
import { PictureInput } from "./picture-input";

type SettingsPictureProps = {
    userDetails: UserDetails;
    userId: HasId["id"];
};

export const SettingsPicture: FC<SettingsPictureProps> = ({ userDetails, userId }) => {
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | undefined>();

    const resetInputValue = () => {
        // Don't forget to reset the inner input state, otherwise it won't set the same image again.
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const resetFile = () => {
        setFile(undefined);
        resetInputValue();
    };

    const [uploadUserPictureMutation, resultOnUpload] = useUploadUserPictureMutation();
    const [removeUserPictureMutation, resultOnRemove] = useRemoveUserPictureByUserIdMutation();

    const uploadUserPicture = (picture: File) => {
        const formData = new FormData();
        formData.append("picture", picture);
        uploadUserPictureMutation({ id: userId, formData }).unwrap().then(resetFile);
    };

    const {
        isTryModeOn: isTryRemoveModeOn,
        tryOnAction: tryRemoveUserPicture,
    } = useTryAction({ onAction: () => removeUserPictureMutation({ id: userId }) });

    const disableButtons = resultOnUpload.isLoading || resultOnRemove.isLoading;
    const disableRemoveButton = disableButtons || !!file;
    const removeButtonView = isTryRemoveModeOn ? "secondary" : "primary";

    return (
        <ColumnStyled>
            <FitContentWrapStyled>
                <Tooltip
                    disabled={disableButtons}
                    message={t("users.profile.settings.picture.actions.uploadButton.tooltip")}
                >
                    <PictureInput
                        alt={userDetails.name}
                        disabled={disableButtons}
                        file={file}
                        src={userDetails.image}
                        inputRef={inputRef}
                        setFile={setFile}
                    />
                </Tooltip>
            </FitContentWrapStyled>

            {file && (
                <LinkButton
                    disabled={disableButtons}
                    onClick={resetFile}
                    view="primary"
                >
                    {t("users.profile.settings.picture.actions.resetButton.title")}
                </LinkButton>
            )}

            {file && (
                <LinkButton
                    disabled={disableButtons}
                    onClick={() => uploadUserPicture(file)}
                    view="secondary"
                >
                    {t("users.profile.settings.picture.actions.saveButton.title")}
                </LinkButton>
            )}

            {userDetails.image && (
                <>
                    <Divider />

                    <Tooltip
                        disabled={disableRemoveButton}
                        message={t("shared.tooltips.tryAction")}
                    >
                        <LinkButton
                            disabled={disableRemoveButton}
                            onClick={tryRemoveUserPicture}
                            view={removeButtonView}
                        >
                            {t("users.profile.settings.picture.actions.removeButton.title")}
                        </LinkButton>
                    </Tooltip>
                </>
            )}
        </ColumnStyled>
    );
};
