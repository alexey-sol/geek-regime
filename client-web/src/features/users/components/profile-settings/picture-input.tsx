import React, { type FC, type Ref } from "react";

import { Skeleton } from "@/shared/components/loaders";
import { UserIcon } from "@/shared/components/icon";

import { UploadFileInputLabelStyled, UploadFileInputStyled } from "./styles";

const INPUT_ID = "file";
const USER_PICTURE_SIZE_PX = 200;

type PictureImageProps = Partial<Pick<HTMLImageElement, "alt" | "src">>;

const PictureImage = ({ alt, ...rest }: PictureImageProps) => (
    <img
        alt={alt}
        height={USER_PICTURE_SIZE_PX}
        width={USER_PICTURE_SIZE_PX}
        {...rest}
    />
);

type PictureInputProps = PictureImageProps & {
    disabled?: boolean;
    file?: File;
    inputRef: Ref<HTMLInputElement>;
    setFile: (file?: File) => void;
};

export const PictureInput: FC<PictureInputProps> = ({
    alt,
    disabled = false,
    file,
    inputRef,
    setFile,
    src,
}) => (
    <Skeleton widthPx={USER_PICTURE_SIZE_PX} heightPx={USER_PICTURE_SIZE_PX} isLoading={disabled}>
        <UploadFileInputStyled
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFile(event.target.files?.[0]);
            }}
            ref={inputRef}
            type="file"
            id={INPUT_ID}
        />

        <UploadFileInputLabelStyled htmlFor={INPUT_ID}>
            {file && <PictureImage alt={alt} src={URL.createObjectURL(file)} />}

            {!file && (src
                ? <PictureImage alt={alt} src={src} />
                : <UserIcon color="purpleLighten" size={USER_PICTURE_SIZE_PX} />)}
        </UploadFileInputLabelStyled>
    </Skeleton>
);
