import { type Color } from "@eggziom/geek-regime-js-ui-kit/types";

const CAP = 999;

export const getCappedCountLabel = (count: number): string => {
    if (count < -CAP) {
        return `${CAP}-`;
    } else if (count > CAP) {
        return `${CAP}+`;
    }

    return `${count}`;
};

export const getRatingColor = (rating: number): Color => {
    if (rating > 0) {
        return "green";
    } else if (rating < 0) {
        return "red";
    }

    return "inherit";
};
