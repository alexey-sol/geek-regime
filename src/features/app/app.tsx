import React from "react";
import { appConfig } from "@/config/app";
import { useAppSelector } from "@store";
import { selectPending } from "@/features/ui/state/selectors";

export const App = () => {
    const pending = useAppSelector(selectPending);
    console.log("pending", pending);

    return (
        <h1>{`Oh hi ${appConfig.appName}.`}</h1>
    );
};
