import React, {
    type FC, Ref, useRef, useState,
} from "react";
import { LinkButton } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import { Tooltip } from "@/shared/components/tooltip";
import { Skeleton } from "@/shared/components/skeleton";
import { UserIcon } from "@/shared/components/icon";
import { Divider } from "@/shared/components/divider";
import { useTryAction } from "@/shared/utils/hooks/use-try-action";
import { type UserDetails } from "@/features/users/models/entities";

import {
    ColumnStyled, FitContentWrapStyled, UploadFileInputLabelStyled, UploadFileInputStyled,
} from "./styles";

const USER_PICTURE_SIZE_PX = 200;

type SettingsPictureProps = {
    userDetails: UserDetails;
};

type PictureProps = {
    alt?: string;
    file?: File;
    image?: string;
    inputRef: Ref<HTMLInputElement>;
    setFile: (file?: File) => void;
};

// TODO half-baked functionality

const Picture: FC<PictureProps> = ({
    alt, file, image, inputRef, setFile,
}) => (
    <Skeleton widthPx={USER_PICTURE_SIZE_PX} heightPx={USER_PICTURE_SIZE_PX} isLoading={false}>
        <UploadFileInputStyled
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFile(event.target.files?.[0]);
            }}
            ref={inputRef}
            type="file"
            id="file"
        />
        <UploadFileInputLabelStyled htmlFor="file">
            {!file && (image
                ? (
                    <img
                        alt={alt}
                        height={USER_PICTURE_SIZE_PX}
                        src={image}
                        width={USER_PICTURE_SIZE_PX}
                    />
                )
                : (
                    <UserIcon color="purpleLighten" size={USER_PICTURE_SIZE_PX} />
                ))}

            {file && (
                <img height={USER_PICTURE_SIZE_PX} src={URL.createObjectURL(file)} width={USER_PICTURE_SIZE_PX} />
            )}
        </UploadFileInputLabelStyled>
    </Skeleton>
);

export const SettingsPicture: FC<SettingsPictureProps> = ({ userDetails }) => {
    const { t } = useTranslation();

    const { image, name } = userDetails;

    const uploadUserPicture = () => {
        console.log("upload");
    };

    const removeUserPicture = () => {};

    const {
        isTryModeOn: isTryRemoveModeOn,
        tryOnAction: tryRemoveUserPicture,
    } = useTryAction({ onAction: removeUserPicture });

    const removeButtonView = isTryRemoveModeOn ? "secondary" : "primary";

    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | undefined>();
    const resetFile = () => setFile(undefined);
    const resetInputValue = () => {
        // Don't forget to reset the inner input state, otherwise it won't set
        // the same image again. There's no other way around.
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <ColumnStyled>
            <FitContentWrapStyled>
                <Tooltip message={t("users.profile.settings.picture.actions.uploadButton.tooltip")}>
                    <Picture
                        alt={name}
                        file={file}
                        image={image}
                        inputRef={inputRef}
                        setFile={setFile}
                    />
                </Tooltip>
            </FitContentWrapStyled>

            {file && (
                <LinkButton
                    onClick={() => {
                        resetFile();
                        resetInputValue();
                    }}
                    view="primary"
                >
                    {t("users.profile.settings.picture.actions.resetButton.title")}
                </LinkButton>
            )}

            {file && (
                <LinkButton
                    onClick={() => {
                        console.log("upload");
                    }}
                    view="secondary"
                >
                    {t("users.profile.settings.picture.actions.saveButton.title")}
                </LinkButton>
            )}

            {image && (
                <>
                    <Divider />
                    <Tooltip message={t("shared.tooltips.tryAction")}>
                        <LinkButton
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
